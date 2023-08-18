import React, { useState, useEffect } from 'react';
import Layout from '../../layouts/layout';

let emailIsValid: string = 'normal';
let authNumberIsValid: string = 'normal';

type PasswordEmailProps = {
  moveNextPage: () => void;
};

const PasswordEmail: React.FC<PasswordEmailProps> = ({ moveNextPage }) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [time, setTime] = useState<number>(180000);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [sendAuthNumber, setSendAuthNumber] = useState<boolean>(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  //이메일 유효성 검사
  if (emailValue.includes('@') || emailValue === '') {
    emailIsValid = 'normal';
  } else {
    emailIsValid = 'notIsValid';
  }

  //authNumber 유효성 검사
  if (time === 0) {
    authNumberIsValid = 'timeOver';
  }

  //timer
  const formattedTime = (time: number) => {
    const minutes = String(Math.floor((time / (1000 * 60)) % 60));
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (timerStarted) {
      const timer = setInterval(() => {
        setTime((prevTime: number) => prevTime - 1000);
      }, 1000);

      if (time <= 0) {
        clearInterval(timer);
        console.log('타이머가 종료되었습니다.');
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, timerStarted]);

  const sendAuthNumberHandler = () => {
    //positive 제약
    if (emailIsValid === 'positive') {
      setSendAuthNumber(true);
      setTimerStarted(true);
    }
  };

  const submitHandler = () => {};

  return (
    <Layout>
      <main className='flex justify-center'>
        <form className='w-342 mt-133 mx-24' onSubmit={submitHandler}>
          <p className='text-primary text-center font-heading--lg'>비밀번호 재설정</p>
          <input
            className={`w-full mt-24 px-12 py-15 rounded-10 border-2 focus:border-[#707070] outline-none placeholder-text_secondary gap-127 font-paragraph--sm ${
              emailIsValid === 'normal'
                ? 'bg-white border-primary/30'
                : emailIsValid === 'notIsValid'
                ? 'bg-negative/10 border-negative focus:border-negative'
                : ''
            }`}
            type='email'
            placeholder='이메일을 입력해주세요'
            onChange={emailChangeHandler}
          />
          {emailIsValid === 'normal' ? (
            <p className='mt-19'></p>
          ) : emailIsValid === 'notIsValid' ? (
            <p className='font-paragraph--sm text-negative'>이메일을 다시 확인해주세요</p>
          ) : (
            <p className='mt-19'></p>
          )}
          <button
            className={`w-full py-13 justify-center rounded-10 text-tertiary font-label--md ${
              emailIsValid === 'positive' ? 'bg-primary hover:bg-hover' : 'bg-[#707070]'
            }`}
            type='button'
            onClick={sendAuthNumberHandler}
            disabled={emailIsValid !== 'positive'}
          >
            이메일 인증하기
          </button>
          {sendAuthNumber ? (
            <p className='font-paragraph--sm text-text_primary'>이메일로 인증번호가 발송되었어요!</p>
          ) : (
            <p className='mb-43'></p>
          )}
          <div className='relative mt-24'>
            <input
              className={`w-full px-12 py-15 rounded-10 border-2 outline-none placeholder-text_secondary gap-127 font-paragraph--sm'
              ${
                authNumberIsValid === 'normal'
                  ? 'bg-white border-primary/30 focus:border-[#707070]'
                  : authNumberIsValid === 'notIsValid'
                  ? 'bg-negative/10 border-negative focus:border-negative'
                  : authNumberIsValid === 'timeOver'
                  ? 'bg-negative/10 border-negative focus:border-negative'
                  : authNumberIsValid === 'positive'
                  ? 'bg-positive/10 border-positive focus:border-positive'
                  : ''
              }`}
              type='text'
              placeholder='인증번호를 입력해주세요'
            />
            <div className='absolute top-16 right-69 font-paragraph--sm'>{formattedTime(time)}</div>
            <button
              className='absolute top-12 right-12 px-12 py-6 rounded-10 bg-primary/30 text-text_secondary font-label--sm hover:bg-border_focus hover:text-white'
              type='button'
            >
              확인
            </button>
            {authNumberIsValid === 'normal' ? (
              <p className='mt-19'></p>
            ) : authNumberIsValid === 'notIsValid' ? (
              <p className='font-paragraph--sm text-negative'>인증번호를 확인해주세요</p>
            ) : authNumberIsValid === 'timeOver' ? (
              <p className='font-paragraph--sm text-negative'>인증 시간이 초과되었어요. 다시 인증해주세요</p>
            ) : authNumberIsValid === 'positive' ? (
              <p className='font-paragraph--sm text-positive'>성공적으로 인증되었어요!</p>
            ) : (
              <p className='mt-19'></p>
            )}
          </div>
          {authNumberIsValid === 'normal' && (
            <button
              className='w-full py-13 mt-24 justify-center bg-primary rounded-10 text-tertiary font-label--md hover:bg-hover'
              type='button'
              onClick={moveNextPage}
            >
              다음
            </button>
          )}
        </form>
      </main>
    </Layout>
  );
};

export default PasswordEmail;
