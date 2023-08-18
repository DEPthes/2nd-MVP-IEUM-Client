import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';
import { IeumError } from '@/class/ieumError';
import { AxiosError } from 'axios';

type SendResponse = {
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

export async function postSend({
  title,
  contents,
  envelopType,
  originalLetterId,
  letterType,
  letterId,
}: {
  title: string;
  contents: string;
  envelopType: number;
  originalLetterId: number | null;
  letterType: string | undefined;
  letterId: number | undefined;
}) {
  const accessToken = authToken.getToken();
  const response = await ieumAxios.post<SendResponse>(
    '/api/letter/send',
    {
      title,
      contents,
      envelopType,
      originalLetterId,
      letterType,
      letterId,
    },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } },
  );
  if (response.data.check === false) {
    throw new IeumError(500) as AxiosError;
  } else return response;
}
