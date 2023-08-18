import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

export type LettersResponse = {
  check: boolean;
  information: {
    letterId: number;
    senderNickname: string;
    contents: string;
    title: string;
    envelopType: number;
    read: boolean;
  };
};

// api 요청 보내는 함수1
export async function getLetterContent(id: number) {
  const accessToken = authToken.getToken();
  return await ieumAxios.get<LettersResponse>(`/api/mailbox/${id}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });
}
