class AuthToken {
  private _token: string | null;

  constructor() {
    console.log('생성');
    this._token = null;
  }

  getToken() {
    return this._token;
  }

  setToken(newToken: string) {
    this._token = newToken;
  }
}

export const authToken = new AuthToken();
