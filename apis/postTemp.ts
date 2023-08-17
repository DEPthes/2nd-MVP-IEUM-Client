import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

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
  return await ieumAxios.post<TempResponse>(
    '/api/letter/temp',
    { originalLetterId, title, contents },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } },
  );
}
