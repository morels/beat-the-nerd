export type NewtonAPIConfigType = {
  server?: string;
  operation?: string;
};

export type NewtonAPIRequest = string;

// This type follows documentation listed here:
// https://newton.now.sh/
export type NewtonAPIResponse =  {
  operation: string,
  expression: string,
  result: string
};

const INITIAL_CONFIG = {
  server: "https://newton-api.herokuapp.com",
  operation: "simplify"
};

/**
 * Build URL needed to communicate with endpoint.
 *
 * Example:
 * https://newton.now.sh/:operation/:expression
 */
class NewtonAPIBuilder {
  config: NewtonAPIConfigType = INITIAL_CONFIG;

  public build(expression: string): NewtonAPIRequest {
    return `${this.config.server}/api/${this.config.operation}/${encodeURIComponent(expression)}`;
  }
}

export default new NewtonAPIBuilder();