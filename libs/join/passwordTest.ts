//password유효성 검사
export const passwordTest = (passwordValue: string) => {
  return (
    (passwordValue.length >= 8 &&
      passwordValue.length <= 12 &&
      //숫자, 영문, 특수문자(!,@,^) 포함 확인 정규식
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@^]).{8,}$/.test(passwordValue)) ||
    passwordValue === ''
  );
};

//checkPassword 유효성 검사
export const checkPasswordTest = (checkPasswordValue: string, passwordValue: string) => {
  return passwordValue === checkPasswordValue || checkPasswordValue === '';
};
