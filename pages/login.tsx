import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '@/apis/postLogin';
import { authToken } from '@/class/authToken';

import Header from '../components/layouts/header';
import CheckSquare from '@/components/check-square';
import EyesIcon from '../public/icons/eye.svg';
import EyesHiddenIcon from '../public/icons/eye-hidden.svg';
import { useRouter } from 'next/router';
import useApiError from '@/hooks/custom/useApiError';
import Layout from '@/components/layouts/layout';

import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const newLoginMutation = useMutation(postLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [IsValid, setIsValid] = useState(true);
  const idValue = useRef<HTMLInputElement>(null);
  const passwordValue = useRef<HTMLInputElement>(null);
  const [loginAble, setLoginAble] = useState(false);

  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCheckLoginHandler = () => {
    setCheckLogin((prevCheckLogin) => !prevCheckLogin);
  };

  const togglejoinHandler = () => {
    router.push('/join');
  };

  const successHandler = (check: boolean, access_token: string) => {
    if (check) {
      setIsValid(true);
      //acess_token 저장
      authToken.setToken(access_token);
      router.push('/');
    } else {
      setIsValid(false);
    }
  };

  const failHandler = () => {
    setIsValid(false);
  };

  const submitHandler = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (idValue.current && passwordValue.current) {
      const email = idValue.current.value;
      const password = passwordValue.current.value;

      newLoginMutation.mutate(
        { email, password },
        {
          onSuccess: (response) => {
            successHandler(response.data.check, response.data.information.accessToken);
          },
          onError: failHandler,
        },
      );
    }
  };

  const toggleForgetPasswordHandler = () => {
    router.push('/reset-password');
  };

  //login 유효성 검사 (추가로 일치 여부 구현해야됨.)
  const checkLoginAble = () => {
    const id = idValue.current?.value || '';
    const password = passwordValue.current?.value || '';
    const isLoginAble = id !== '' && password !== '';
    setLoginAble(isLoginAble);
  };
  return (
    <Layout>
      <Head>
        <title>이:음 | 로그인</title>
        <meta name='description' content='이:음의 이용 방법에 대해 알아보아요' />
      </Head>
      <main className='flex justify-center'>
        <form className='w-342 mt-133 mx-24' onSubmit={submitHandler}>
          <h1 className='font-heading--lg text-primary mb-24 text-center'>로그인</h1>
          {/* input Id */}
          <div className='relative flex items-center'>
            <input
              className='w-full h-50 px-12 text-text_primary font-paragraph--sm rounded-10 border-2
              border-border_transparent focus:outline-none focus:border-border_focus bg-white placeholder:text-text_secondary'
              ref={idValue}
              onChange={checkLoginAble}
              placeholder='아이디를 입력해주세요'
            />
          </div>

          {/* input Password */}
          <div className='relative flex mt-25'>
            <input
              type={showPassword ? 'text' : 'password'}
              ref={passwordValue}
              onChange={checkLoginAble}
              className='w-full px-12 h-50 rounded-10 text-text_primary font-paragraph--sm 
              focus:outline-none focus:border-border_focus bg-white border-2 border-border_transparent placeholder:text-text_secondary'
              placeholder='비밀번호를 입력해주세요'
            />
            <button type='button' onClick={togglePasswordHandler}>
              {showPassword ? (
                <EyesIcon className='absolute right-17 top-14 mt-3' />
              ) : (
                <EyesHiddenIcon className='absolute right-16 top-10 mt-3' />
              )}
            </button>
          </div>

          {!IsValid ? (
            <p className=' text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
              아이디 또는 비밀번호를 다시 확인해주세요.
            </p>
          ) : (
            <p className='mt-4'>&nbsp;</p>
          )}

          {/* Button */}
          <button
            className={`flex w-342 h-50 mt-31 justify-center items-center font-label--md
           rounded-10 text-[16px] text-left not-italic text-[#FFFCF7]
          ${loginAble ? 'bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070]'}`}
            disabled={!loginAble}
          >
            로그인
          </button>
          <button
            type='button'
            className='flex w-342 h-50 mt-24 justify-center items-center bg-[#675149] 
            rounded-10 text-[16px] font-label--md text-left not-italic text-[#FFFCF7] 
            hover:bg-[#2D2421]'
            onClick={togglejoinHandler}
          >
            간편가입
          </button>

          <div className='flex justify-between mt-35'>
            <div className='flex'>
              <div className='inline-flex gap-10'>
                <CheckSquare onClick={toggleCheckLoginHandler} checked={checkLogin} />
                <p
                  className='text-[#675149] mt-3 rounded-10 text-[12px] 
                font-paragraph--sm text-left not-italic'
                >
                  로그인 상태 유지
                </p>
              </div>
            </div>
            <button
              type='button'
              className='text-[#675149] rounded-10 text-[12px] 
              font-paragraph--sm text-left not-italic '
              onClick={toggleForgetPasswordHandler}
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
}
