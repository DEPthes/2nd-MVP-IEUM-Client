import ieumAxios from './ieumAxios';

// refresh 토큰으로 accessToken 재발급
export async function refreshAccessToken() {
  return ieumAxios.get<{ accessToken: string }>('/api/refresh');
}
