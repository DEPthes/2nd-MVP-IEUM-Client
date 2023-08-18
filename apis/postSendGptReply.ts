import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';
import { IeumError } from '@/class/ieumError';
import { AxiosError } from 'axios';

type GptResponse = {
  check: boolean;
  information: {
    message: string;
  };
};

export async function postSendGptReply({
  title,
  contents,
  envelopType,
}: {
  title: string;
  contents: string;
  envelopType: number;
}) {
  const accessToken = authToken.getToken();
  const response = await ieumAxios.post<GptResponse>(
    '/api/letter/reply-gpt',
    {
      title,
      contents,
      envelopType,
    },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } },
  );
  if (response.data.check === false) {
    throw new IeumError(500) as AxiosError;
  } else return response;
}
