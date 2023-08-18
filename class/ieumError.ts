export class IeumError extends Error {
  response: {
    status: number;
  };
  constructor(status: number) {
    super();
    this.response = { status };
  }
}
