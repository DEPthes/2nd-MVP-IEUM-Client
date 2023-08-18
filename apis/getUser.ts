import ieumAxios from './ieumAxios';

type UserResponse = {
  check: boolean;
  information: {
    id: number;
  };
};

export async function getUser(accessToken: string) {
  return ieumAxios.get<UserResponse>('/api/user/verify', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
