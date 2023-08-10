import React, { useState } from 'react';

const user = {
  id: 'asdf@1234',
  password: '1234',
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);
  const [formValue, setFormValue] = useState({
    idValue: '',
    passwordValue: '',
  });
  const [formIsValid, setFormIsValid] = useState({
    idIsValid: true,
    passwordIsValid: true,
  });

  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleCheckLoginHandler = () => {
    setCheckLogin((prevCheckLogin) => !prevCheckLogin);
  };

  const idChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      idValue: event.target.value,
    }));
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      passwordValue: event.target.value,
    }));
  };

  const submitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    //check
    setFormIsValid({
      idIsValid: true,
      passwordIsValid: true,
    });

    //id, password Check
    if (user.id !== formValue.idValue || user.password !== formValue.passwordValue) {
      setFormIsValid((prevFormIsValid) => ({
        passwordIsValid: user.password === formValue.passwordValue,
        idIsValid: user.id === formValue.idValue,
      }));

      return;
    }
    alert('로그인 되었습니다.');
  };

  let loginAble = false;

  if (formValue.idValue !== '' && formValue.passwordValue !== '') {
    loginAble = true;
  }

  return (
    <main>
      <form onSubmit={submitHandler}>
        <div className='w-[390px] h-[844px] relative overflow-hidden bg-[#fffcf7]'>
          {/* Header */}

          {/* font-family */}
          <p className='mt-145 mx-167 text-[21px] font-SUITE text-left not-italic text-[#675149]'>로그인</p>

          {/* input Id */}
          <input
            className={`inline-flex w-342 h-50 ml-[24px] mt-[24px] pl-12 rounded-10 border-2 focus:outline-none focus:border-[#707070] ${
              formIsValid.idIsValid ? 'bg-white border-[#675149]/30' : 'bg-[#e11900]/10 border-[#E11900]'
            }`}
            onChange={idChangeHandler}
            placeholder='아이디를 입력해주세요'
          />
          {!formIsValid.idIsValid || !formIsValid.passwordIsValid ? (
            <p className='ml-[24px] text-[12px] text-left leading-[160%] not-italic line-hei text-[#e11900]'>
              아이디 또는 비밀번호를 다시 확인해주세요.
            </p>
          ) : (
            <p className='mt-[4px]'>&nbsp;</p>
          )}

          {/* input Password */}
          <div className='relative inline-flex'>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={passwordChangeHandler}
              className={`inline-flex w-342 h-50 ml-[24px] mt-[5px] pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] ${
                formIsValid.passwordIsValid
                  ? 'bg-white border-2 border-[#675149]/30'
                  : 'bg-[#e11900]/10 border-2 border-[#E11900]'
              }`}
              placeholder='비밀번호를 입력해주세요'
            />
            <button type='button' className='ml-[-36px] mt-3.5' onClick={togglePasswordHandler}>
              <img src={showPassword ? '/icons/eye.svg' : '/icons/eye-hidden.svg'}></img>
            </button>
          </div>

          {/* Button */}
          <button
            className={`flex w-342 h-50 m-24 mt-51 justify-center items-center 
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
                <button onClick={toggleCheckLoginHandler} type='button'>
                  <img
                    src={checkLogin ? '/icons/check-square.svg' : '/icons/uncheck-square.svg'}
                    className='w-24 h-24'
                  />
                </button>
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
