import ieumAxios from './ieumAxios';

type TempsResponse = {
  check: boolean;
  information: {
    letterId: number;
    title: string;
    modifiedAt: string;
  }[];
};

export async function getTemps(accessToken: string | null) {
  return await ieumAxios.get<TempsResponse>('/api/letter/temp-new', {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });
}
