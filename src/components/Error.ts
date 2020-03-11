export default class Error {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export function isError(a: string | Error): a is Error {
  return (a as Error).message !== undefined;
}
