import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';
import { IeumError } from '@/class/ieumError';
import { AxiosError } from 'axios';

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

export async function postTemp({
  originalLetterId,
  title,
  contents,
}: {
  originalLetterId: number | null;
  title: string;
  contents: string;
}) {
  const accessToken = authToken.getToken();
  const response = await ieumAxios.post<TempResponse>(
    '/api/letter/temp',
    { originalLetterId, title, contents },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } },
  );
  if (response.data.check === false) {
    throw new IeumError(500) as AxiosError;
  } else return response;
}
