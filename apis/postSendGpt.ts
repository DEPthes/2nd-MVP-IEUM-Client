import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

type GptResponse = {
  check: boolean;
  information: {
    message: string;
  };
};

export async function postSendGpt({
  title,
  contents,
  envelopType,
}: {
  title: string;
  contents: string;
  envelopType: number;
}) {
  const accessToken = authToken.getToken();
  return await ieumAxios.post<GptResponse>(
    '/api/letter/send-gpt',
    {
      title,
      contents,
      envelopType,
    },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } },
  );
}
