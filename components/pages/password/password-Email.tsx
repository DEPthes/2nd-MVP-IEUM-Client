import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../layouts/layout';
import { postSendAuthNumber } from '@/apis/postSendAuthNumber';
import { useMutation } from 'react-query';
import useApiError from '@/hooks/custom/useApiError';
import { deleteAuthNumber } from '@/apis/deleteAuthNumber';
import { AxiosError } from 'axios';

type PasswordEmailProps = {
  moveNextPage: () => void;
  passwordChangeHandler: React.Dispatch<React.SetStateAction<string>>;
};

const PasswordEmail: React.FC<PasswordEmailProps> = ({ moveNextPage, passwordChangeHandler }) => {
  const [emailValue, setEmailValue] = useState<string>('');
  const [emailIsValid, setEmailIsValid] = useState<'normal' | 'notIsValid' | 'positive' | 'duplicated'>('normal');
  const [time, setTime] = useState<number>(180000);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [sendAuthNumber, setSendAuthNumber] = useState<boolean>(false);
  const [authNumberIsValid, setAuthNumberIsValid] = useState<'normal' | 'timeOver' | 'positive' | 'notIsValid'>(
    'normal',
  );
  const authNumberValue = useRef<HTMLInputElement>(null);
  const newSendAuthNumberMutation = useMutation(postSendAuthNumber);
  const newCheckAuthNumberMutation = useMutation(deleteAuthNumber);

  const toggleNextHandler = () => {
    // "다음" 버튼 클릭 시 호출되는 함수
    moveNextPage();
    passwordChangeHandler(emailValue); // 입력된 이메일 값을 joinChangeHandler로 전달
  };

  //Email 실시간 유효성 검사
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmailValue = event.target.value;
    setEmailValue(newEmailValue);

    if (newEmailValue === '') {
      setEmailIsValid('normal');
    } else if (newEmailValue.includes('@')) {
      setEmailIsValid('positive');
    } else {
      setEmailIsValid('notIsValid');
    }
  };

  //timer
  const formattedTime = (time: number) => {
    const minutes = String(Math.floor((time / (1000 * 60)) % 60));
    const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  //timer 로직
  useEffect(() => {
    if (timerStarted) {
      const timer = setInterval(() => {
        setTime((prevTime: number) => prevTime - 1000);
      }, 1000);

      if (time <= 0) {
        clearInterval(timer);
        setAuthNumberIsValid('timeOver');
        setTimerStarted(false);
        console.log('타이머가 종료되었습니다.');
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, timerStarted]);

  //resetTimer
  const resetTimer = () => {
    setTime(180000);
    setAuthNumberIsValid('normal');
  };

  //인증코드 전송
  const sendAuthNumberHandler = () => {
    //타이머 시작 로직
    setSendAuthNumber(true);
    resetTimer();
    setTimerStarted(true);
    //인증 번호 전송
    const email = emailValue;
    //실패 처리 따로 지정 여부
    newSendAuthNumberMutation.mutate({ email });
  };

  const checkAuthNumberSuccessHandler = (check: boolean) => {
    if (check) {
      setAuthNumberIsValid('positive');
    }
  };

  //에러처리 => 인증번호가 일치하지 않을 경우
  const { handlerError } = useApiError({
    400: () => setAuthNumberIsValid('notIsValid'),
  });

  //인증번호 확인
  const checkAuthNumberHandler = async () => {
    if (authNumberValue.current) {
      const authNumber = authNumberValue.current.value;
      newCheckAuthNumberMutation.mutate(
        { authNumber },
        {
          onSuccess: (response) => {
            checkAuthNumberSuccessHandler(response.data.check);
          },
          onError: (err) => handlerError(err as AxiosError),
        },
      );
    }
  };

  const submitHandler = () => {};

  return (
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
            emailIsValid === 'positive' && (!timerStarted || time <= 0)
              ? ' bg-[#675149] hover:bg-[#2D2421]'
              : 'bg-[#707070]'
          }`}
          type='button'
          onClick={sendAuthNumberHandler}
          disabled={emailIsValid !== 'positive' || timerStarted} //타이머가 동작 중이거나 이메일이 유효하지 않을 때 비활성화
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
            ref={authNumberValue}
            type='text'
            placeholder='인증번호를 입력해주세요'
          />
          <div className='absolute top-16 right-69 font-paragraph--sm'>{formattedTime(time)}</div>
          <button
            className='absolute top-12 right-12 px-12 py-6 rounded-10 bg-primary/30 text-text_secondary font-label--sm hover:bg-border_focus hover:text-white'
            type='button'
            onClick={checkAuthNumberHandler}
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
        {authNumberIsValid === 'positive' && (
          <button
            className='w-full py-13 mt-24 justify-center bg-primary rounded-10 text-tertiary font-label--md hover:bg-hover'
            type='button'
            onClick={toggleNextHandler}
          >
            다음
          </button>
        )}
      </form>
    </main>
  );
};

export default PasswordEmail;
