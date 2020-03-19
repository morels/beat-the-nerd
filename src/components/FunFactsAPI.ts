type OperationType = "math" | "trivia" | "random";

export type FunFactsAPIConfigType = {
  server?: string;
  operation?: OperationType;
};

export type FunFactsAPIRequest = string;

const INITIAL_CONFIG: {
  server: string;
  operation: OperationType;
} = {
  server: "http://numbersapi.com",
  operation: "math"
};

const availableOperations: OperationType[] = ["math", "trivia"];

const randomOperation = (): OperationType =>
  availableOperations[Math.round(Math.random())];
/**
 * Build URL needed to communicate with endpoint.
 *
 * Example:
 * http://numbersapi.com/:number/:operation
 */
export default class FunFactsAPIBuilder {
  private static instance: FunFactsAPIBuilder | undefined;

  private constructor() {}

  public static getInstance = (): FunFactsAPIBuilder => {
    if (!FunFactsAPIBuilder.instance) {
      FunFactsAPIBuilder.instance = new FunFactsAPIBuilder();
    }
    return FunFactsAPIBuilder.instance;
  };

  private config: FunFactsAPIConfigType = INITIAL_CONFIG;

  public build(
    numberAsString: string,
    operation?: OperationType
  ): FunFactsAPIRequest {
    return `${this.config.server}/${encodeURIComponent(numberAsString)}/${
      operation
        ? operation === "random"
          ? randomOperation()
          : operation
        : this.config.operation
    }`;
  }
}
