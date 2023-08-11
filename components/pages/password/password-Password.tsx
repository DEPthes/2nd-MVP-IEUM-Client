import React, { useState } from 'react';
import EyeOpenIcon from '../../../public/icons/eye-opened.svg';
import EyeHiddenIcon from '../../../public/icons/eye-hidden.svg';
import Layout from '../../layouts/layout';
import useAlert from '../../../recoil/alert/useAlert';

let passwordIsValid: string;
let checkPasswordIsValid: string;

const PasswordPassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState({
    showPassword: false,
    showCheckPassword: false,
  });
  const [passwordValue, setPasswordValue] = useState({
    passwordValue: '',
    checkPasswordValue: '',
  });
  const { showAlert } = useAlert();

  //새 비밀번호 입력 비밀번호 보이기&숨기기
  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      showPassword: !prevShowPassword.showPassword,
    }));
  };

  //새 비밀번호 확인 비밀번호 보이기&숨기기
  const toggleCheckPasswordHandler = () => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      showCheckPassword: !prevShowPassword.showCheckPassword,
    }));
  };

  const onChangePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue((prevPasswordValue) => ({
      ...prevPasswordValue,
      passwordValue: event.target.value,
    }));
  };

  const onChangeCheckPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue((prevPasswordValue) => ({
      ...prevPasswordValue,
      checkPasswordValue: event.target.value,
    }));
  };

  //영문, 숫자, 특수문자(!/@/^)를 포함한 8자 ~ 12자
  const regExp = /^(?=.*[a-zA-Z])(?=.*[!@^])(?=.*[0-9]).{8,12}$/;
  //비밀번호 유효성 검사
  if (passwordValue.passwordValue === '') {
    passwordIsValid = 'normal';
  } else if (!regExp.test(passwordValue.passwordValue)) {
    passwordIsValid = 'negative';
  } else {
    passwordIsValid = 'positive';
  }

  //비밀번호 확인 유효성 검사
  if (passwordValue.checkPasswordValue === '') {
    checkPasswordIsValid = 'normal';
  } else if (passwordValue.passwordValue === passwordValue.checkPasswordValue) {
    checkPasswordIsValid = 'positive';
  } else {
    checkPasswordIsValid = 'negative';
  }

  return (
    <Layout>
      <main className='flex justify-center'>
        <form className='w-342 mt-133 mx-24'>
          <p className='text-primary text-center font-heading--lg'>비밀번호 재설정</p>
          <div className='relative mt-24'>
            <input
              className={`w-full px-12 py-15  rounded-10 border-2 outline-none placeholder-text_secondary gap-127 font-paragraph--sm ${
                passwordIsValid === 'normal'
                  ? 'bg-white border-primary/30 focus:border-primary'
                  : passwordIsValid === 'negative'
                  ? 'bg-negative/10 border-negative focus:border-negative'
                  : passwordIsValid === 'positive'
                  ? 'bg-positive/10 border-positive focus:border-positive'
                  : ''
              }`}
              type={showPassword.showPassword ? 'text' : 'password'}
              placeholder='새 비밀번호 입력'
              onChange={onChangePasswordHandler}
            />
            <button className='absolute top-15 right-12' type='button' onClick={togglePasswordHandler}>
              {showPassword.showPassword ? <EyeOpenIcon /> : <EyeHiddenIcon />}
            </button>
            {passwordIsValid === 'negative' ? (
              <p className='font-paragraph--sm text-negative'>
                영문, 숫자, 특수문자(!/@/^) 를 모두 포함한 8~12자로 입력해주세요
              </p>
            ) : (
              <p className='mb-19'></p>
            )}
            <div className='relative'>
              <input
                className={`w-full px-12 py-15 rounded-10 border-2 outline-none placeholder-text_secondary gap-127 font-paragraph--sm ${
                  checkPasswordIsValid === 'normal'
                    ? 'bg-white border-primary/30 focus:border-primary'
                    : checkPasswordIsValid === 'negative'
                    ? 'bg-negative/10 border-negative focus:border-negative'
                    : checkPasswordIsValid === 'positive'
                    ? 'bg-positive/10 border-positive focus:border-positive'
                    : ''
                }`}
                type={showPassword.showCheckPassword ? 'text' : 'password'}
                placeholder='새 비밀번호 확인'
                onChange={onChangeCheckPasswordHandler}
              />
              <button className='absolute top-15 right-12' type='button' onClick={toggleCheckPasswordHandler}>
                {showPassword.showCheckPassword ? <EyeOpenIcon /> : <EyeHiddenIcon />}
              </button>
              {checkPasswordIsValid === 'negative' ? (
                <p className='font-paragraph--sm text-negative'>비밀번호를 다시 확인해주세요</p>
              ) : (
                <p className='mt-19'></p>
              )}
            </div>
            <button
              className='w-full py-13 mt-24 justify-center bg-primary rounded-10 text-tertiary font-label--md disabled:cursor-default disabled:bg-[#707070] hover:bg-hover'
              type='button'
              disabled={!(passwordIsValid === 'positive' && checkPasswordIsValid === 'positive')}
              onClick={() =>
                showAlert({
                  // \n이 안먹힘.. 줄바꿈이 안된다ㅠ
                  title: '비밀번호가 변경되었어요!\n로그인하고 이: 음을 이용해보세요',
                  actions: [
                    { title: '예', style: 'primary', handler: null },
                    { title: '아니오', style: 'tertiary', handler: null },
                  ],
                })
              }
            >
              비밀번호 변경
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default PasswordPassword;