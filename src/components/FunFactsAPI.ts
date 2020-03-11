type OperationType = "math" | "trivia";

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
class FunFactsAPIBuilder {
  config: FunFactsAPIConfigType = INITIAL_CONFIG;

  public build(
    numberAsString: string,
    isRandomizationRequested?: boolean
  ): FunFactsAPIRequest {
    return `${this.config.server}/${encodeURIComponent(numberAsString)}/${
      isRandomizationRequested ? randomOperation() : this.config.operation
    }`;
  }
}

export default new FunFactsAPIBuilder();
