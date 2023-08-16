import ieumAxios from './ieumAxios';

export type NicknameResponse = {
  check: boolean;
  information: {
    nickname: string[];
  };
};

export async function getNickname() {
  return await ieumAxios.get<NicknameResponse>('/auth/nickname');
}
