import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

type TempsResponse = {
  check: boolean;
  information: {
    id: number;
    title: string;
    contents: string;
    envelopType: number;
    letterType: string;
    senderId: number;
    receiverId: number | null;
    read: boolean;
  };
};

export async function getTemp(letterId: number) {
  const accessToken = authToken.getToken();
  return await ieumAxios.get<TempsResponse>(`/api/letter/temp/${letterId}`, {
    headers: { 'Content-Type': 'application/json', accessToken },
    params: letterId,
  });
}
