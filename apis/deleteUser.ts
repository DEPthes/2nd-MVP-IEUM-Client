import { authToken } from '@/class/authToken';
import ieumAxios from './ieumAxios';

export function deleteUser() {
  return ieumAxios.delete('/api/user/leave', {
    headers: {
      Authorization: `Bearer ${authToken.getToken()}`,
    },
  });
}
