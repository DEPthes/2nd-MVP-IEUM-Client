import React, { useState } from 'react';
import EyeOpenIcon from '../../../public/icons/eye-opened.svg';
import EyeHiddenIcon from '../../../public/icons/eye-hidden.svg';
import Layout from '../../layouts/layout';
import useAlert from '../../../recoil/alert/useAlert';
import { patchResetPassword } from '@/apis/patchResetPassword';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useApiError from '@/hooks/custom/useApiError';
import { useRouter } from 'next/router';
import { passwordRegex } from '@/libs/passwordRegex';

let passwordIsValid: string;
let checkPasswordIsValid: string;

type PasswordPasswordProps = {
  email: string;
};

const PasswordPassword: React.FC<PasswordPasswordProps> = ({ email }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState({
    showPassword: false,
    showCheckPassword: false,
  });
  const [passwordValue, setPasswordValue] = useState({
    passwordValue: '',
    checkPasswordValue: '',
  });
  const { showAlert } = useAlert();
  const newChangePasswordMutation = useMutation(patchResetPassword);
  const { handleError: handleDefaultError } = useApiError();

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

  //비밀번호 유효성 검사
  if (passwordValue.passwordValue === '') {
    passwordIsValid = 'normal';
  } else if (!passwordRegex.test(passwordValue.passwordValue)) {
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

  const changePasswordHandler = () => {
    const { passwordValue: newPassword, checkPasswordValue: renewPassword } = passwordValue;
    newChangePasswordMutation.mutate(
      { email, newPassword, renewPassword },
      {
        onSuccess: () =>
          showAlert({
            title: (
              <div className='flex flex-col items-center'>
                <span>비밀번호가 변경되었어요!</span>
                <span>로그인하고 이:음을 이용해보세요</span>
              </div>
            ),
            actions: [
              { title: '네', style: 'primary', handler: () => router.push('/login') },
              { title: '아니요', style: 'tertiary', handler: () => router.push('/') },
            ],
          }),
        onError: handleDefaultError,
      },
    );
  };
  // const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  return (
    <main className='flex justify-center pt-133'>
      <form className='w-342 mx-24'>
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
            onClick={changePasswordHandler}
          >
            비밀번호 변경
          </button>
        </div>
      </form>
    </main>
  );
};

export default PasswordPassword;
