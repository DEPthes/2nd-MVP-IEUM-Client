// AxiosError를 인위적으로 만드는 방법을 몰라서 AxiosError에서 코드만 추출할 수 있게 만들어보았다.

export class IeumError extends Error {
  response: {
    status: number;
  };
  constructor(status: number) {
    super();
    this.response = { status };
  }
}
