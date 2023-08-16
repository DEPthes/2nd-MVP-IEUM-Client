import ieumAxios from './ieumAxios';
import { authToken } from '@/class/authToken';

type TempsResponse = {
  check: boolean;
  information: {
    letterId: number;
    title: string;
    modifiedAt: string;
  }[];
};

export async function getTemps() {
  const accessToken = authToken.getToken();
  return await ieumAxios.get<TempsResponse>('/api/letter/temp-new', {
    headers: { 'Content-Type': 'application/json', accessToken },
  });
}
