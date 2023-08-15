import ieumAxios from './ieumAxios';

// accessToken 유저 인증 api
export async function verifyUser(accessToken: string) {
  return await ieumAxios.get<{ check: boolean }>('/api/verify', { headers: { Authorization: accessToken } });
}
