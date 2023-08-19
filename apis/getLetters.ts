import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

export type LettersResponse = {
  check: boolean;
  information: {
    envelopType: number;
    letterId: number;
    senderNickname: string;
    title: string;
    modifiedAt: string;
  }[];
};
export type LetterType = 'read' | 'unread';
export async function getLetters(type: LetterType) {
  const accessToken = authToken.getToken();
  const url = type === 'read' ? '/api/mailbox/read' : '/api/mailbox';
  return await ieumAxios.get<LettersResponse>(url, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });
}
