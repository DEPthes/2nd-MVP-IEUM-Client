import { useState, useEffect } from 'react';

//얘네 useState로 바꿈 ??
let emailIsValid: string = 'normal';
let authNumberIsValid: string = 'normal';

export default function signUpAuth() {
  const [emailValue, setEmailValue] = useState<String>('');
  const [time, setTime] = useState<number>(180000);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [sendAuthNumber, setSendAuthNumber] = useState<boolean>(false);

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };

  //email 유효성 검사 => positive, duplicated 추가 예정
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

  //이거 reset 추가해야되나요
  const sendAuthNumberHandler = () => {
    //positive 제약
    if (emailIsValid === 'positive') {
      setSendAuthNumber(true);
      setTimerStarted(true);
    }
  };

  const submitHandler = () => {};
  return (
    <main>
      <form onSubmit={submitHandler}>
        <div className='w-[390px] h-[844px] relative overflow-hidden bg-[#fffcf7]'>
          {/* Header */}
          <div className='flex justify-between mt-59'>
            <img src='/icons/logo1.svg' className='px-28' />
            <div className='flex items-center justify-end mr-24'>
              <img src='/icons/menu.svg' className='px-14' />
              <img src='/icons/profile.svg' />
            </div>
          </div>
          {/* font-family */}
          <p className='mt-153 mx-167 w-100 text-[21px] font-SUITE text-left not-italic text-[#675149]'>간편가입</p>
          <p className='mt-16 text-center text-[12px] font-SUITE not-italic text-[#675149]'>
            로그인 시 사용할 이메일을 입력해주세요.
          </p>
          <p className='mx-44 w-600 text-[12px] font-SUITE not-italic text-[#675149]'>
            이메일은 회원가입 후 변경하실 수 없으니 신중하게 입력해주세요.
          </p>

          {/* Input Email */}
          <div>
            <div className='relative inline-flex'>
              {/* 얘네 왜 border 색 안 먹음 */}
              <input
                className={`inline-flex w-342 h-50 ml-[24px] mt-[24px] pl-12 rounded-10
              focus:outline-none focus:border-[#707070] border-2 ${
                emailIsValid === 'normal'
                  ? 'bg-white border-[#675149]/30'
                  : emailIsValid === 'notIsValid'
                  ? 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
                  : emailIsValid === 'duplicated'
                  ? 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
                  : emailIsValid === 'positive'
                  ? 'bg-[#048848]/10 border-[#048848] focus:border-[#048848]'
                  : ''
              }`}
                placeholder='이메일을 입력해주세요'
                onChange={emailChangeHandler}
              />
              <button
                type='button'
                className='ml-[-75px] mt-34 w-66 h-30 rounded-[10px] bg-[#675149]/30 hover:bg-[#675149]'
              >
                중복체크
              </button>
              {/* 유효성 검사 텍스트 */}
            </div>
            {emailIsValid === 'normal' ? (
              <p className='mt-[4px]'>&nbsp;</p>
            ) : emailIsValid === 'notIsValid' ? (
              <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
                이메일을 다시 확인해주세요
              </p>
            ) : emailIsValid === 'duplicated' ? (
              <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
                이미 가입된 이메일이에요
              </p>
            ) : emailIsValid === 'positive' ? (
              <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#048848]'>
                사용 가능한 이메일입니다!
              </p>
            ) : (
              ''
            )}
          </div>

          {/* authenticated button */}
          <div>
            <button
              type='button'
              className={`flex w-342 h-50  ml-24 mt-15 justify-center items-center  
            rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7]
              ${emailIsValid === 'positive' ? ' bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070]'}`}
              onClick={sendAuthNumberHandler}
              disabled={emailIsValid !== 'positive'}
            >
              이메일로 인증하기
            </button>
            {sendAuthNumber ? (
              <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic '>
                이메일로 인증번호가 발송되었어요!
              </p>
            ) : (
              <p className='mt-[4px]'>&nbsp;</p>
            )}
          </div>

          {/* Input authNumber */}
          <div className='relative inline-flex mt-25'>
            <input
              className={`inline-flex w-342 h-50 ml-[24px] pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] border-2 ${
                authNumberIsValid === 'normal'
                  ? 'bg-white border-[#675149]/30'
                  : authNumberIsValid === 'notIsValid'
                  ? 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
                  : authNumberIsValid === 'timeOver'
                  ? 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
                  : authNumberIsValid === 'positive'
                  ? 'bg-[#048848]/10 border-[#048848] focus:border-[#048848]'
                  : ''
              }`}
              placeholder='인증번호를 입력해주세요'
            />

            {/* clear button */}
            <button
              type='button'
              className='ml-[-55px] mt-10 w-45 h-30 rounded-[10px]  bg-[#675149]/30 hover:bg-[#675149]'
            >
              확인
            </button>
            <div className='ml-[-82px] mt-17 text-12 not-italic'>{formattedTime(time)}</div>

            {/* text */}
          </div>
          {authNumberIsValid === 'normal' ? (
            <p className='mt-[4px]'>&nbsp;</p>
          ) : authNumberIsValid === 'notIsValid' ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
              인증번호를 확인해주세요
            </p>
          ) : authNumberIsValid === 'timeOver' ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
              인증 시간이 초과되었어요. 다시 인증해주세요
            </p>
          ) : authNumberIsValid === 'positive' ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#048848]'>
              성공적으로 인증되었어요!
            </p>
          ) : (
            ''
          )}

          {/* next button */}
          {/* 활성화 개념 1: disable, 2: x */}
          {authNumberIsValid === 'normal' && (
            <button
              className='flex w-342 h-50  ml-24 mt-22 justify-center items-center bg-[#675149] 
          rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7] hover:bg-[#2D2421]'
            >
              다음
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
