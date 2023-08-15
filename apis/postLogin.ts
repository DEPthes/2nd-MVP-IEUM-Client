import ieumAxios from './ieumAxios';

type LoginResponse = {
  check: boolean;
  information: {
    access_token: string;
    refresh_token: string;
  };
};

export async function postLogin({ email, password }: { email: string; password: string }) {
  return await ieumAxios.post<LoginResponse>('/auth/sign-in', {
    email,
    password,
  });
}
