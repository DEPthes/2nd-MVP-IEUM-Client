import ieumAxios from './ieumAxios';

export type LettersResponse = {
  check: boolean;
  information: {
    letterId: number;
    senderNickname: string;
    title: string;
    modifiedAt: string;
  }[];
};
export type LetterType = 'read' | 'unread';

export async function getLetters(type: LetterType, accessToken: string) {
  const url = type === 'read' ? '/api/mail/read' : '/api/mailbox';
  return await ieumAxios.get<LettersResponse>(url, {
    headers: { 'Content-Type': 'application/json', accessToken },
  });
}
