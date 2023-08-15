import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { postLogin } from '@/apis/postLogin';
import { authToken } from '@/class/authToken';

import Header from '../components/layouts/header';
import CheckSquare from '@/components/check-square';
import Eyes from '../public/icons/eye.svg';
import EyesHidden from '../public/icons/eye-hidden.svg';

// import useLoginQuery from '@/hooks/queries/useLoginQuery';

const user = {
  id: 'asdf@1234',
  password: '1234',
};

export default function Login() {
  const newLoginMutation = useMutation(postLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [IsValid, setIsValid] = useState(true);
  const idValue = useRef<HTMLInputElement | null>(null);
  const passwordValue = useRef<HTMLInputElement | null>(null);

  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCheckLoginHandler = () => {
    setCheckLogin((prevCheckLogin) => !prevCheckLogin);
  };

  const successHandler = (check: boolean, access_token: string) => {
    if (check) {
      setIsValid(true);
      //acess_token 저장
      authToken.setToken(access_token);
      console.log(access_token);
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
            successHandler(response.data.check, response.data.information.access_token);
          },
          onError: failHandler,
        },
      );
    }
  };

  //login 유효성 검사 (추가로 일치 여부 구현해야됨.)
  const loginAble: boolean = idValue !== null && passwordValue !== null;

  return (
    <main>
      <form onSubmit={submitHandler}>
        <div className='w-390 h-844 relative overflow-hidden bg-[#fffcf7]'>
          {/* Header */}
          {/* <Header /> */}
          {/* font-family */}
          <p className='mt-145 mx-167 text-[21px] font-SUITE text-left not-italic text-[#675149]'>로그인</p>

          {/* input Id */}
          <input
            className='inline-flex w-342 h-50 ml-24 mt-24 pl-12 rounded-10 border-2 focus:outline-none 
            focus:border-[#707070] bg-white border-[#675149]/30'
            ref={idValue}
            placeholder='아이디를 입력해주세요'
          />

          {/* input Password */}
          <div className='relative inline-flex mt-20'>
            <input
              type={showPassword ? 'text' : 'password'}
              ref={passwordValue}
              className='inline-flex w-342 h-50 ml-24 mt-5 pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] bg-white border-2 border-[#675149]/30'
              placeholder='비밀번호를 입력해주세요'
            />
            <button type='button' className='ml-[-36px] mt-3.5' onClick={togglePasswordHandler}>
              {showPassword ? <Eyes /> : <EyesHidden />}
            </button>
          </div>

          {!IsValid ? (
            <p className='ml-24 text-12px text-left leading-[160%] not-italic line-hei text-[#e11900]'>
              아이디 또는 비밀번호를 다시 확인해주세요.
            </p>
          ) : (
            <p className='mt-1'>&nbsp;</p>
          )}

          {/* Button */}
          <button
            className={`flex w-342 h-50 m-24 mt-31 justify-center items-center 
           rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7]
          ${loginAble ? 'bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070]'}`}
            disabled={!loginAble}
          >
            로그인
          </button>
          <button
            type='button'
            className='flex w-342 h-50 m-24 justify-center items-center bg-[#675149] 
            rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7] 
            hover:bg-[#2D2421]'
          >
            간편가입
          </button>

          <div className='flex justify-between mt-35'>
            <div className='flex px-24'>
              <div className='inline-flex'>
                <CheckSquare onClick={toggleCheckLoginHandler} checked={checkLogin} />
                <p
                  className='text-[#675149] ml-6 mt-3 rounded-10 text-[12px] 
                font-SUITE text-left not-italic'
                >
                  로그인 상태 유지
                </p>
              </div>
            </div>
            <button
              type='button'
              className='px-24 ml-4 text-[#675149] rounded-10 text-[12px] 
              font-SUITE text-left not-italic '
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
