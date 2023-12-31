import { IeumError } from '@/class/ieumError';
import ieumAxios from './ieumAxios';

type ResetPasswordType = {
  check: boolean;
  information: {
    message: string;
  };
};

export async function patchResetPassword({
  email,
  newPassword,
  renewPassword,
}: {
  email: string;
  newPassword: string;
  renewPassword: string;
}) {
  // 비밀번호 같거나 형식이 다르거나 가입되지 않은 이메일일 경우 400 에러
  // 앞의 두 경우는 프론트에서 검사하므로 세번째 경우만 처리
  const response = await ieumAxios.patch<ResetPasswordType>('/auth/password', {
    email,
    newPassword,
    renewPassword,
  });
  if (!response.data.check) {
    throw new IeumError(400);
  }
  return response;
}
