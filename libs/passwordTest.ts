//checkPassword 유효성 검사
export const checkPasswordTest = (checkPasswordValue: string, passwordValue: string) => {
  return passwordValue === checkPasswordValue || checkPasswordValue === '';
};
