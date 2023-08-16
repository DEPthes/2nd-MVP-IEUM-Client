import ieumAxios from './ieumAxios';

type SignUpResponse = {
  check: boolean;
  information: {
    accessToken: string;
    refreshToken: string;
  };
};

export async function postSignUp({ nickname, email, password }: { nickname: string; email: string; password: string }) {
  return await ieumAxios.post<SignUpResponse>('/auth/sign-up', {
    nickname,
    email,
    password,
  });
}
