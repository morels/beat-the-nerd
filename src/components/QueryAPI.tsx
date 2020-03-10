export type QueryAPIConfigType = {
  server?: string;
  operation?: string;
};

export type QueryAPIRequest = string;

// This type follows documentation listed here:
// https://newton.now.sh/
export type QueryAPIResponse =  {
  operation: string,
  expression: string,
  result: string
};

const INITIAL_CONFIG = {
  server: "https://newton.now.sh",
  operation: "simplify"
};

/**
 * Build URL needed to communicate with endpoint.
 *
 * Example:
 * https://newton.now.sh/:operation/:expression
 */
class QueryAPIBuilder {
  config: QueryAPIConfigType = INITIAL_CONFIG;

  public build(expression: string): QueryAPIRequest {
    return `/${this.config.operation}/${encodeURIComponent(expression)}`;
  }
}

export default new QueryAPIBuilder();