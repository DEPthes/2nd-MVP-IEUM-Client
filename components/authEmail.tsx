import { deleteAuthNumber } from '@/apis/deleteAuthNumber';
import { getEmailDuplicated } from '@/apis/getEmailDuplicated';
import { postSendAuthNumber } from '@/apis/postSendAuthNumber';
import useApiError from '@/hooks/custom/useApiError';
import { cls } from '@/utils/cls';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

type Props = {
  title: React.ReactNode;
  screenType: 'join' | 'reset-password';
  moveNextPage: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const DEFAULT_TIMER_TIME = 1000 * 60 * 3; // 타이머 초기 값 -> 3분

export default function AuthEmail({ title, screenType, moveNextPage, setEmail }: Props) {
  // 이메일 입력값
  const [emailValue, setEmailValue] = useState<string>('');

  // 이메일 유효성 검사 여부
  // normal - 기본값 | notIsValid - 형식 오류 | positive - 통과 | duplicated - 중복(회원가입에만 해당) | notUser - 존재하지 않는 회원(비밀번호 재설정에만 해당)
  const [emailIsValid, setEmailIsValid] = useState<'normal' | 'notIsValid' | 'positive' | 'duplicated' | 'notUser'>(
    'normal',
  );
  const [time, setTime] = useState<number>(DEFAULT_TIMER_TIME);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [AuthNumberSended, setAuthNumberSended] = useState<boolean>(false); // 인증번호 발송되었는지
  const [authNumber, setAuthNumber] = useState('');
  const [authNumberIsValid, setAuthNumberIsValid] = useState<'normal' | 'timeOver' | 'positive' | 'notIsValid'>(
    'normal',
  );

  const { handleApiError } = useApiError();

  const checkEmailDuplicatedMutation = useMutation(getEmailDuplicated);

  // 인증번호 받아오기
  const newSendAuthNumberMutation = useMutation(postSendAuthNumber);

  // 입력한 인증번호 맞는지 체크
  const newCheckAuthNumberMutation = useMutation(deleteAuthNumber);

  // 이메일 input 활성화 여부 - 타이머가 시작되거나 인증번호 입력에 성공하면 비활성화
  const isEmailFieldActive = !timerStarted && authNumberIsValid !== 'positive';

  // 이메일 인증하기 버튼 활성화 여부 - isEmailFieldActive && 이메일이 제대로 입력되었을 때
  const isEmailBtnActive = isEmailFieldActive && emailIsValid === 'positive';

  // 인증번호 확인 input 활성화 여부 - 인증번호가 전송되지 않았거나 시간 초과되었을 때나 인증번호 인증에 성공했다면 비활성화
  const isAuthNumberFieldActive =
    AuthNumberSended && authNumberIsValid !== 'timeOver' && authNumberIsValid !== 'positive';

  // 인증번호 확인 버튼 활성화 여부 - isAuthNumberFieldActive && 인증번호 필드에 값이 들어왔을 때
  const isAuthNumberBtnActive = isAuthNumberFieldActive && authNumber.length > 0;

  const toggleNextHandler = () => {
    // "다음" 버튼 클릭 시 호출되는 함수
    moveNextPage();
    setEmail(emailValue); // 입력된 이메일 값을 joinChangeHandler로 전달
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
      }

      return () => {
        clearInterval(timer);
      };
    }
  }, [time, timerStarted]);

  //resetTimer
  const resetTimer = () => {
    setTime(DEFAULT_TIMER_TIME);
    setAuthNumberIsValid('normal');
  };

  // 이메일 인증하기 버튼 클릭했을 때
  const sendAuthNumberHandler = async () => {
    // 비밀번호 재설정 페이지는 이메일 중복 검사를 추가로 수행한다.
    // 이메일이 중복되어야 기존 회원임을 인증함

    const response = await getEmailDuplicated(emailValue);
    const isExistUser = !response.data.information.available; // 이미 존재하는 유저인지
    if (screenType === 'join' && isExistUser) {
      setEmailIsValid('duplicated');
      return;
    }
    if (screenType === 'reset-password' && !isExistUser) {
      setEmailIsValid('notUser');
      return;
    }

    //타이머 시작 로직
    setAuthNumberSended(true);
    resetTimer();
    setTimerStarted(true);

    // TODO:실패 처리 따로 지정 여부
    newSendAuthNumberMutation.mutate({ email: emailValue });
  };

  const checkAuthNumberSuccessHandler = (check: boolean) => {
    if (check) {
      setAuthNumberIsValid('positive');
      setTimerStarted(false);
    }
  };

  //인증번호 확인
  const checkAuthNumberHandler = async () => {
    newCheckAuthNumberMutation.mutate(
      { authNumber },
      {
        onSuccess: (response) => {
          checkAuthNumberSuccessHandler(response.data.check);
        },

        //에러처리 => 인증번호가 일치하지 않을 경우
        onError: handleApiError({
          400: () => setAuthNumberIsValid('notIsValid'),
        }),
      },
    );
  };

  const submitHandler = () => {};

  return (
    <main className='flex justify-center pt-133'>
      <form className='w-342 mx-24' onSubmit={submitHandler}>
        {title}
        <input
          className={`w-full px-12 py-15 rounded-10 border-2 focus:border-[#707070] outline-none placeholder-text_secondary placeholder:font-paragraph--sm gap-127 font-paragraph--sm ${
            emailIsValid === 'normal'
              ? 'bg-white border-primary/30'
              : emailIsValid === 'notIsValid' || emailIsValid === 'duplicated' || emailIsValid === 'notUser'
              ? 'bg-negative/10 border-negative focus:border-negative'
              : ''
          }`}
          type='email'
          disabled={!isEmailFieldActive}
          placeholder='이메일을 입력해주세요'
          onChange={emailChangeHandler}
        />
        {emailIsValid === 'notIsValid' || emailIsValid === 'notUser' ? (
          <p className='font-paragraph--sm text-negative'>이메일을 다시 확인해주세요</p>
        ) : emailIsValid === 'duplicated' ? (
          <p className='font-paragraph--sm text-negative'>이미 가입된 이메일이에요</p>
        ) : (
          <p className='mt-19'></p>
        )}
        <button
          className={`w-full py-13 justify-center rounded-10 text-tertiary font-label--md ${
            isEmailBtnActive ? ' bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070]'
          }`}
          type='button'
          onClick={sendAuthNumberHandler}
          disabled={!isEmailBtnActive} //타이머가 동작 중이거나 이메일이 유효하지 않을 때 비활성화
        >
          이메일 인증하기
        </button>
        {AuthNumberSended ? (
          <p className='font-paragraph--sm text-positive'>이메일로 인증번호가 발송되었어요!</p>
        ) : (
          <p className='mb-43'></p>
        )}
        <div className='relative mt-24'>
          <input
            className={`w-full px-12 py-15 rounded-10 border-2 outline-none placeholder-text_secondary placeholder:font-paragraph--sm gap-127 font-paragraph--sm'
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
            value={authNumber}
            onChange={(e) => setAuthNumber(e.target.value)}
            type='text'
            disabled={!isAuthNumberFieldActive}
            placeholder='인증번호를 입력해주세요'
          />
          <div className='absolute top-16 right-69 font-paragraph--sm'>{formattedTime(time)}</div>
          <button
            className={cls(
              'absolute top-12 right-12 px-12 py-6 rounded-10 bg-primary/30 text-text_secondary font-label--sm',
              isAuthNumberBtnActive ? 'hover:bg-border_focus hover:text-white' : '',
            )}
            type='button'
            disabled={!isAuthNumberBtnActive}
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
}
