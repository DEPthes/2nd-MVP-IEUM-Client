import axios from 'axios';

type UserResponse = {
  id: string;
  nickname: string;
};

export async function getUser(accessToken: string) {
  return axios.get<UserResponse>('/api/user');
}
