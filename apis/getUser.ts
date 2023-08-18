import { authToken } from '@/class/authToken';
import ieumAxios from './ieumAxios';

type UserResponse = {
  check: boolean;
  information: {
    id: number;
  };
};

export async function getUser() {
  return ieumAxios.get<UserResponse>('/api/user/verify', {
    headers: { Authorization: `Bearer ${authToken.getToken()}` },
  });
}
