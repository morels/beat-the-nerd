import UIDs from "../components/UserIds";
import NewtonAPIBuilder, { NewtonAPIResponse } from "../components/NewtonAPI";
import FunFactsAPIBuilder from "../components/FunFactsAPI";
import { applicationChangeState } from "./application";
import Error, { isError } from "../components/Error";
import { fetchWithTO } from "../utils/fetchWithTO";
import { Dispatch, ThunkAction } from ".";

export const addMessage = (text: string, uid: number) => ({
  type: "ADD_MESSAGE",
  text,
  uid
});

export const getMessages = () => ({
  type: "GET_MESSAGES"
});

const NewtonAPI = NewtonAPIBuilder.getInstance();
const FunFactsAPI = FunFactsAPIBuilder.getInstance();

const fetchNewtonAnswer = (question: string): Promise<string | Error> => {
  return fetchWithTO(NewtonAPI.build(question))
    .then((response: Response) => response.json())
    .then((response: NewtonAPIResponse) => response.result)
    .catch((error: string) => {
      return new Error(error);
    });
};

const fetchFunFactAnswer = (question: string): Promise<string | Error> => {
  const OPERATION = "random";
  return fetchWithTO(FunFactsAPI.build(question, OPERATION))
    .then((response: Response) => response.text())
    .catch((error: string) => {
      return new Error(error);
    });
};

const isNaturalPositive = (numberAsString: string): boolean => {
  const numberAsNumber = Number(numberAsString);
  return isNaN(numberAsNumber)
    ? false
    : numberAsNumber >= 0 && numberAsNumber === Math.trunc(numberAsNumber);
};

export const askQuestion = (message: string): ThunkAction<Promise<void>> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(addMessage(message, UIDs.user));
    dispatch(applicationChangeState("answering the user"));
    const answerOrError = await fetchNewtonAnswer(message);
    if (isError(answerOrError)) {
      dispatch(giveAnswer("Oh no, I don't know"));
    } else if (isNaturalPositive(answerOrError)) {
      dispatch(addMessage(answerOrError, UIDs.cpu));
      dispatch(tellFunFact(answerOrError));
    } else {
      dispatch(giveAnswer(answerOrError));
    }
  };
};

export const tellFunFact = (message: string): ThunkAction<Promise<void>> => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(applicationChangeState("searching fun fact"));
    const answerOrError = await fetchFunFactAnswer(message);
    dispatch(
      giveAnswer(
        isError(answerOrError)
          ? "Mmh, never mind."
          : `Hey! ${answerOrError} Mind it!`
      )
    );
  };
};

export const giveAnswer = (message: string): ThunkAction<void> => {
  return (dispatch: Dispatch): void => {
    dispatch(addMessage(message, UIDs.cpu));
    dispatch(applicationChangeState("waiting for user question"));
  };
};

export type MessageType = {
  text: string;
  id: number;
  uid: number;
};

export type MessageActions =
  | ReturnType<typeof addMessage>
  | ReturnType<typeof getMessages>;
