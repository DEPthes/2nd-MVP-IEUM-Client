import ieumAxios from './ieumAxios';

type TempsResponse = {
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

export async function getTemp(letterId: number, accessToken: string | null) {
  return await ieumAxios.get<TempsResponse>(`/api/letter/temp/${letterId}`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
  });
}
