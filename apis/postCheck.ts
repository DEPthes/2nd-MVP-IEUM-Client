import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';
import { IeumError } from '@/class/ieumError';
import { AxiosError } from 'axios';

type CheckResponse = {
  check: boolean;
  information: {
    prohibition: number;
  };
};

export async function postCheck({ title, contents }: { title: string; contents: string }) {
  const accessToken = authToken.getToken();
  const response = await ieumAxios.post<CheckResponse>(
    '/api/letter/check-gpt',
    {
      title,
      contents,
    },
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    },
  );
  if (response.data.information.prohibition === 1) {
    throw new IeumError(400) as AxiosError;
  } else return response;
}
