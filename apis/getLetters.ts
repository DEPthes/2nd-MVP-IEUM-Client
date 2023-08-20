import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

export type GetLettersReqParams = {
  type: LetterType;
  page: number;
  size: number;
};

export type LettersResponse = {
  check: boolean;
  information: {
    content: {
      envelopType: number;
      letterId: number;
      senderNickname: string | null;
      title: string;
      modifiedAt: string;
    }[];
    pageable: {
      pageNumber: number;
      pageSize: number;
    };
    last: boolean;
  };
};
export type LetterType = 'read' | 'unread';
export async function getLetters({ type, page, size }: GetLettersReqParams) {
  const accessToken = authToken.getToken();
  const url = type === 'read' ? '/api/mailbox/read' : '/api/mailbox';
  const params = {
    page,
    size,
  };
  return await ieumAxios.get<LettersResponse>(url, {
    params,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });
}
