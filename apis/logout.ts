import ieumAxios from './ieumAxios';

export function logout() {
  return ieumAxios.post('/auth/sign-out');
}
