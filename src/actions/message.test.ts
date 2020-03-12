import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  askQuestion,
  tellFunFact,
  MyThunkDispatch,
  addMessage
} from "./message";
import fetchMock from "fetch-mock";
import expect from "expect"; // You can use any testing library
import NewtonAPIBuilder, { NewtonAPIResponse } from "../components/NewtonAPI";
import FunFactsAPIBuilder from "../components/FunFactsAPI";
import UIDs from "../components/UserIds";
import { Action } from "redux";
import { MessagesState, initialMessagesState } from "../reducers/message";

const middlewares = [thunk];
const mockStore = configureMockStore<MessagesState, MyThunkDispatch>(
  middlewares
);

describe("Newton API", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns a courtesy message after having received an error due to invalid input", () => {
    fetchMock.getOnce(NewtonAPIBuilder.build(""), 404);

    const expectedActions = [
      {
        type: "ADD_MESSAGE",
        text: "",
        uid: UIDs.user
      },
      { type: "APP_STATE_CHANGE", payload: "answering the user" },
      {
        type: "ADD_MESSAGE",
        text: "Oh no, I don't know",
        uid: UIDs.cpu
      },
      {
        type: "APP_STATE_CHANGE",
        payload: "waiting for user question"
      }
    ];

    const store = mockStore(initialMessagesState);

    return store.dispatch(askQuestion("")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("returns the correct answer to non numeric-positive input", () => {
    fetchMock.getOnce(NewtonAPIBuilder.build("x+1"), {
      body: {
        operation: "x+1",
        expression: "simplify",
        result: "x+1"
      },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      {
        type: "ADD_MESSAGE",
        text: "x+1",
        uid: UIDs.user
      },
      { type: "APP_STATE_CHANGE", payload: "answering the user" },
      {
        type: "ADD_MESSAGE",
        text: "x+1",
        uid: UIDs.cpu
      },
      {
        type: "APP_STATE_CHANGE",
        payload: "waiting for user question"
      }
    ];

    const store = mockStore(initialMessagesState);

    return store.dispatch(askQuestion("x+1")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("returns the correct answer to numeric-positive input", () => {
    fetchMock.getOnce(NewtonAPIBuilder.build("2+1"), {
      body: {
        operation: "2+1",
        expression: "simplify",
        result: "3"
      },
      headers: { "content-type": "application/json" }
    });
    fetchMock.getOnce("http://numbersapi.com/3/trivia", 200);
    fetchMock.getOnce("http://numbersapi.com/3/math", 200);

    const expectedActions = [
      {
        type: "ADD_MESSAGE",
        text: "2+1",
        uid: UIDs.user
      },
      { type: "APP_STATE_CHANGE", payload: "answering the user" },
      {
        type: "ADD_MESSAGE",
        text: "3",
        uid: UIDs.cpu
      },
      {
        type: "APP_STATE_CHANGE",
        payload: "searching fun fact"
      }
    ];

    const store = mockStore(initialMessagesState);

    return store.dispatch(askQuestion("2+1")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe("FunFacts API", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("returns a courtesy message after having received an error due to invalid input", () => {
    fetchMock.getOnce("http://numbersapi.com/a/trivia", 400);
    fetchMock.getOnce("http://numbersapi.com/a/math", 400);

    const expectedActions = [
      { type: "APP_STATE_CHANGE", payload: "searching fun fact" },
      {
        type: "ADD_MESSAGE",
        text: "Mmh, never mind.",
        uid: UIDs.cpu
      },
      {
        type: "APP_STATE_CHANGE",
        payload: "waiting for user question"
      }
    ];

    const store = mockStore(initialMessagesState);

    return store.dispatch(tellFunFact("a")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("returns a message containing the success response message ", () => {
    fetchMock.getOnce("http://numbersapi.com/1/trivia", {
      body: "Some random sentence with 1.",
      headers: { "content-type": "text/plain" }
    });
    fetchMock.getOnce("http://numbersapi.com/1/math", {
      body: "Some random sentence with 1.",
      headers: { "content-type": "text/plain" }
    });

    const expectedActions = [
      { type: "APP_STATE_CHANGE", payload: "searching fun fact" },
      {
        type: "ADD_MESSAGE",
        text: "Hey! Some random sentence with 1. Mind it!",
        uid: UIDs.cpu
      },
      {
        type: "APP_STATE_CHANGE",
        payload: "waiting for user question"
      }
    ];

    const store = mockStore(initialMessagesState);

    return store.dispatch(tellFunFact("1")).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
