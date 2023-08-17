import ieumAxios from './ieumAxios';

type UserResponse = {
  id: string;
};

export async function getUser(accessToken: string) {
  return ieumAxios.get<UserResponse>('/api/user/verify', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
