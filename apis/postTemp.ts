import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

type Letter = {
  title: string;
  contents: string;
};

type TempResponse = {
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

export async function postTemp({ letter }: { letter: Letter }) {
  const accessToken = authToken.getToken();
  console.log(accessToken);
  return await ieumAxios.post<TempResponse>('/api/letter/temp', {
    headers: { 'Content-Type': 'application/json', accessToken },
    letter,
  });
}
