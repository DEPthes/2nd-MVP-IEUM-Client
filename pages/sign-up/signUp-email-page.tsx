import React, { useState } from 'react';

let passwordIsValid: boolean;
let checkPasswordIsValid: boolean;
let signupIsValid: boolean;

export default function signUpEmail() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);
  const [checkAge, setCheckAge] = useState(false);
  const [checkAdmit, setCheckAdmit] = useState(false);
  const [checkNickname, setCheckNickname] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [checkPasswordValue, setCheckPasswordValue] = useState('');

  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCheckPasswordHandler = () => {
    setShowCheckPassword((prevShowCheckPassword) => !prevShowCheckPassword);
  };

  const toggleCheckAgeHandler = () => {
    setCheckAge((prevCheckAge) => !prevCheckAge);
  };

  const toggleCheckAdmitHandler = () => {
    setCheckAdmit((prevCheckAdmit) => !prevCheckAdmit);
  };

  const toggleDeleteHandler = () => {
    setCheckNickname('inputNickName');
  };

  const duplicationCheckHandler = () => {
    setCheckNickname('dublicated');
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const checkPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPasswordValue(event.target.value);
  };

  if (
    (passwordValue.length >= 8 &&
      passwordValue.length <= 12 &&
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(passwordValue)) ||
    passwordValue === ''
  ) {
    passwordIsValid = true;
  } else {
    passwordIsValid = false;
  }

  if (passwordValue === checkPasswordValue || checkPasswordValue === '') {
    checkPasswordIsValid = true;
  } else {
    checkPasswordIsValid = false;
  }

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {};

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
          <p
            className='mt-153 mx-167 w-100 text-[21px] font-SUITE text-left not-italic
          text-[#675149]'
          >
            간편가입
          </p>
          <p
            className='mt-24 mx-24 w-100 text-[16px] font-SUITE text-left not-italic 
          text-[#675149]'
          >
            닉네임
          </p>

          {/* input nickname */}
          <div className='relative inline-flex'>
            <input
              className='inline-flex w-342 h-50 ml-[24px] pl-12 rounded-10 border-2 focus:outline-none focus:border-[#707070] ${
              bg-white border-[#675149]/30'
              placeholder='닉네임을 입력해주세요'
            />
            <button type='button' onClick={toggleDeleteHandler} className='ml-[-75px] mt-3'>
              <img src='/icons/delete.svg' />
            </button>
            <button type='button' className='ml-10 mt-3'>
              <img src='/icons/return.svg' />
            </button>
          </div>
          <button
            className='flex w-342 h-50 mx-24 mt-16 justify-center items-center 
           rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7]
          bg-[#675149] hover:bg-[#2D2421]'
            type='button'
            onClick={duplicationCheckHandler}
          >
            중복체크
          </button>
          {checkNickname === '' ? (
            <p className='mt-[4px]'>&nbsp;</p>
          ) : checkNickname === 'inputNickName' ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic '>
              한글, 영문 관계없이 3~10자로 입력해주세요
            </p>
          ) : checkNickname === 'dublicated' ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic '>이미 존재하는 닉네임이에요 </p>
          ) : (
            ''
          )}

          {/* input password */}
          <p
            className='mx-24 mt-5 w-100 text-[16px] font-SUITE text-left not-italic 
          text-[#675149]'
          >
            비밀번호
          </p>

          <div className='relative inline-flex'>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={passwordChangeHandler}
              className={`inline-flex w-342 h-50 ml-[24px] pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] border-2
              ${
                passwordIsValid
                  ? 'bg-white border-2 border-[#675149]/30'
                  : 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
              }`}
              placeholder='비밀번호를 입력'
            />
            <button type='button' className='ml-[-36px] mt-3' onClick={togglePasswordHandler}>
              <img src={showPassword ? '/icons/eye.svg' : '/icons/eye-hidden.svg'}></img>
            </button>
          </div>
          {passwordIsValid ? (
            <p className='mt-[4px]'>&nbsp;</p>
          ) : (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
              영문, 숫자, 특수문자(!/@/^) 를 모두 포함한 8~12자로 입력해주세요
            </p>
          )}

          <div className='relative inline-flex mt-2'>
            <input
              type={showCheckPassword ? 'text' : 'password'}
              onChange={checkPasswordChangeHandler}
              className={`inline-flex w-342 h-50 ml-[24px] pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] border-2
              ${
                checkPasswordIsValid
                  ? 'bg-white border-2 border-[#675149]/30'
                  : 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
              }`}
              placeholder='비밀번호를 입력'
            />
            <button type='button' className='ml-[-36px] mt-3' onClick={toggleCheckPasswordHandler}>
              <img src={showCheckPassword ? '/icons/eye.svg' : '/icons/eye-hidden.svg'}></img>
            </button>
          </div>
          {checkPasswordIsValid ? (
            <p className='mt-[4px]'>&nbsp;</p>
          ) : (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic text-[#e11900]'>
              비밀번호를 다시 확인해주세요
            </p>
          )}
          {/* chekBox */}
          <div className='inline-flex  mx-24'>
            <button onClick={toggleCheckAgeHandler} type='button'>
              <img src={checkAge ? '/icons/check-square.svg' : '/icons/uncheck-square.svg'} />
            </button>
            <p
              className='text-[#675149] ml-6 mt-3 rounded-10 text-[12px] 
                font-SUITE text-left not-italic'
            >
              만 14세 이상입니다(필수)
            </p>
          </div>

          <div className='inline-flex mx-24'>
            <button onClick={toggleCheckAdmitHandler} type='button'>
              <img src={checkAdmit ? '/icons/check-square.svg' : '/icons/uncheck-square.svg'} />
            </button>
            <p
              className='text-[#675149] ml-6 mt-3 rounded-10 text-[12px] 
                font-SUITE text-left not-italic'
            >
              편지 알림 이메일 수신 동의 (필수)
            </p>
          </div>

          {/* sign up */}
          {/* 활성화 처리 해야됨 */}
          <button
            className={`flex w-342 h-50 m-24 mt-13 justify-center items-center 
           rounded-10 text-[16px] font-SUITE text-left not-italic text-[#FFFCF7]
          bg-[#675149] 
          ${signupIsValid ? 'bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070] '}`}
            disabled={!signupIsValid}
          >
            회원가입 완료
          </button>
        </div>
      </form>
    </main>
  );
}
