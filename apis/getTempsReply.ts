import ieumAxios from './ieumAxios';

type TempsResponse = {
  check: boolean;
  information: {
    letterId: number;
    title: string;
    modifiedAt: string;
  }[];
};

export async function getTempsReply(letterId: number, accessToken: string | null) {
  return await ieumAxios.get<TempsResponse>('/api/letter/temp-reply', {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    params: { letterId },
  });
}
