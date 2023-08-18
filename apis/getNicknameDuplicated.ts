import ieumAxios from './ieumAxios';

export type NicknameDuplicatedResponse = {
  check: boolean;
  information: {
    available: boolean;
  };
};

export async function getNicknameDuplicated(nickname: string) {
  const url = '/auth/nickname/' + nickname;
  return await ieumAxios.get<NicknameDuplicatedResponse>(url);
}
