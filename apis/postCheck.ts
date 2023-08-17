import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

type CheckResponse = {
  check: boolean;
  information: {
    prohibition: number;
  };
};

export async function postCheck({ title, contents }: { title: string; contents: string }) {
  const accessToken = authToken.getToken();
  return await ieumAxios.post<CheckResponse>(
    '/api/letter/check-gpt',
    {
      title,
      contents,
    },
    {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    },
  );
}
