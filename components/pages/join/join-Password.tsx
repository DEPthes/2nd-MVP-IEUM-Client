import React, { useEffect, useState } from 'react';

import CheckSquare from '@/components/check-square';
import { passwordTest, checkPasswordTest } from '@/libs/join/passwordTest';

import DeleteIcon from '../../../public/icons/delete.svg';
import ReturnIcon from '../../../public/icons/return2.svg';
import EyesIcon from '../../../public/icons/eye.svg';
import EyesHiddenIcon from '../../../public/icons/eye-hidden.svg';
import LoadingIcon from '../../../public/icons/loading1.svg';

import { getNicknameDuplicated } from '@/apis/getNicknameDuplicated';
import { getNickname } from '@/apis/getNickname';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { postSignUp } from '@/apis/postSignUp';
import useApiError from '@/hooks/custom/useApiError';
import { AxiosError } from 'axios';

type JoinPasswordType = {
  email: string;
};

const JoinPassword: React.FC<JoinPasswordType> = ({ email }) => {
  const router = useRouter();
  const newSignUpMutation = useMutation(postSignUp);
  const [nickname, setNickname] = useState<string>('');
  //API로부터 받아온 닉네임들 저장하는 배열
  const [nicknames, setNicknames] = useState<string[]>([]);

  const [showPassword, setShowPassword] = useState({
    showPassword: false,
    showCheckPassword: false,
  });

  const [checkSquare, setCheckSquare] = useState({
    ageSquare: false,
    admitSquare: false,
  });

  const [checkNickname, setCheckNickname] = useState<'' | 'inputNickName' | 'positive' | 'duplicated' | 'error'>('');

  const [passwordValue, setPasswordValue] = useState({
    passwordValue: '',
    checkPasswordValue: '',
  });

  const [isFetch, setIsFetch] = useState<boolean>(false);

  //초기 닉네임 설정
  const initNicknames = [
    '혁명적인설탕',
    '고요한오리',
    '긍정적인다람쥐',
    '꾸준한호랑이',
    '센스있는팬더',
    '빛나는별',
    '신비로운달',
    '환상적인바람',
    '푸른바다',
    '자유로운새',
  ];

  // 초기 닉네임 중 랜덤 닉네임 1개 선택 로직
  useEffect(() => {
    const getRandomNickname = () => {
      const randomIndex = Math.floor(Math.random() * initNicknames.length);
      return initNicknames[randomIndex];
    };
    setNickname(getRandomNickname());

    // changeNicknameHandler();
  }, []); // 빈 배열을 의존성 배열로 사용

  const setNicknameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const togglePasswordHandler = () => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      showPassword: !prevShowPassword.showPassword,
    }));
  };

  const toggleCheckPasswordHandler = () => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      showCheckPassword: !prevShowPassword.showCheckPassword,
    }));
  };

  const toggleCheckAgeHandler = () => {
    setCheckSquare((prevCheckSquare) => ({
      ...prevCheckSquare,
      ageSquare: !prevCheckSquare.ageSquare,
    }));
  };

  const toggleCheckAdmitHandler = () => {
    setCheckSquare((prevCheckSquare) => ({
      ...prevCheckSquare,
      admitSquare: !prevCheckSquare.admitSquare,
    }));
  };

  const toggleDeleteHandler = () => {
    setNickname('');
    setCheckNickname('inputNickName');
  };

  const duplicationCheckHandler = async () => {
    const response = await getNicknameDuplicated(nickname!);
    if (response.data.information.available) {
      setCheckNickname('positive');
    } else {
      setCheckNickname('duplicated');
    }
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue((prevPasswordValue) => ({
      ...prevPasswordValue,
      passwordValue: event.target.value,
    }));
  };

  const checkPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue((prevPasswordValue) => ({
      ...prevPasswordValue,
      checkPasswordValue: event.target.value,
    }));
  };

  //에러 처리
  const { handlerError } = useApiError({
    // 닉네임 GPT오류
    500: () => setCheckNickname('error'),
    // 회원가입 체크
    400: () => console.log('sign-up error'),
  });

  //GPT닉네임 바꾸는 함수
  async function changeNicknameHandler() {
    try {
      // 저장된 배열이 0일 때만 API 호출
      if (nicknames.length === 0) {
        setIsFetch(true);
        const response = await getNickname();
        setNicknames(response.data.information.nickname);
      }
      setIsFetch(false);
      setNickname(nicknames[0]);

      //GPT가 빈 배열을 가져오는 경우
      if (nicknames.length === 0) {
        setCheckNickname('error');
      } else {
        setCheckNickname('');
      }

      setNicknames((prevNicknames) => prevNicknames.slice(1));
    } catch (error) {
      // 서버에서 500 오류가 발생한 경우
      setIsFetch(false);
      handlerError(error as AxiosError);
    }
  }

  //signUp 유효성 검사
  const signUpTest = () => {
    return (
      checkNickname === 'positive' &&
      passwordIsValid &&
      checkPasswordIsValid &&
      checkSquare.admitSquare &&
      checkSquare.ageSquare
    );
  };

  const passwordIsValid = passwordTest(passwordValue.passwordValue);

  const checkPasswordIsValid = checkPasswordTest(passwordValue.checkPasswordValue, passwordValue.passwordValue);

  const signUpIsValid = signUpTest();

  const successHandler = (check: boolean) => {
    console.log(check);
    if (check) {
      router.push('/');
      console.log('sign-up');
    }
  };

  //에러처리 => 인증번호가 일치하지 않을 경우

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const password = passwordValue.passwordValue;
    newSignUpMutation.mutate(
      { nickname, email, password },
      {
        onSuccess: (response) => {
          successHandler(response.data.check);
        },
        onError: (err) => handlerError(err as AxiosError),
      },
    );
  };

  return (
    <main className='h-full flex flex-col justify-center items-center'>
      <h1 className='font-heading--lg mb-24'>간편가입</h1>
      <form className='w-342' onSubmit={submitHandler}>
        {/* Header */}

        {/* font-family */}

        <h4 className='font-heading--md text-primary'>닉네임</h4>

        {/* input nickname */}
        <div className='relative flex items-center'>
          <input
            className='w-full h-50 px-12 text-text_primary font-paragraph--sm rounded-10 border-2 border-border_transparent focus:outline-none focus:border-border_focus bg-white placeholder:text-text_secondary'
            placeholder='닉네임을 입력해주세요'
            value={nickname}
            onChange={setNicknameHandler}
          />
          <button type='button' onClick={toggleDeleteHandler} className=' absolute right-50'>
            <DeleteIcon />
          </button>

          {!isFetch ? (
            <button type='button' onClick={changeNicknameHandler}>
              <ReturnIcon className='absolute top-13 right-15' />
            </button>
          ) : (
            <LoadingIcon width='40' height='40' className='absolute bottom-[-3px] right-0' />
          )}
        </div>

        <button
          className='relative flex w-full h-50 mt-16 justify-center items-center 
           rounded-10 text-[16px] font-label--md text-left not-italic text-[#FFFCF7]
          bg-[#675149] hover:bg-[#2D2421]'
          type='button'
          onClick={duplicationCheckHandler}
        >
          중복체크
        </button>

        {checkNickname === '' ? (
          <p className='mt-[4px]'>&nbsp;</p>
        ) : checkNickname === 'inputNickName' ? (
          <p className='w-full text-[12px] text-left leading-[160%] not-italic '>
            한글, 영문 관계없이 3~10자로 입력해주세요
          </p>
        ) : checkNickname === 'duplicated' ? (
          <p className='w-full text-[12px] text-left leading-[160%] not-italic '>이미 존재하는 닉네임이에요 </p>
        ) : checkNickname === 'positive' ? (
          <p className='w-full text-[12px] text-left leading-[160%] not-italic '>사용 가능한 닉네임이에요 </p>
        ) : checkNickname === 'error' ? (
          <p className='w-full text-[12px] text-left leading-[160%] not-italic '>
            AI가 닉네임 추천에 실패했어요. 버튼을 다시 눌러주세요
          </p>
        ) : (
          ''
        )}

        {/* input password */}
        <p
          className='w-full mt-5 text-[16px] font-heading--md text-left not-italic 
          text-[#675149]'
        >
          비밀번호
        </p>

        <div className='relative inline-flex'>
          <input
            type={showPassword.showPassword ? 'text' : 'password'}
            onChange={passwordChangeHandler}
            className={`inline-flex w-342 h-50 pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] border-2 placeholder:text-text_secondary text-text_primary font-paragraph--sm
              ${
                passwordIsValid
                  ? 'bg-white border-2 border-[#675149]/30'
                  : 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
              }`}
            placeholder='비밀번호를 입력'
          />
          <button type='button' onClick={togglePasswordHandler}>
            {showPassword.showPassword ? (
              <EyesIcon className='absolute right-17 top-14 mt-3' />
            ) : (
              <EyesHiddenIcon className='absolute right-16 top-10 mt-3' />
            )}
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
            type={showPassword.showCheckPassword ? 'text' : 'password'}
            onChange={checkPasswordChangeHandler}
            className={`inline-flex w-342 h-50 pl-12 rounded-10 
              focus:outline-none focus:border-[#707070] border-2 placeholder:text-text_secondary text-text_primary font-paragraph--sm
              ${
                checkPasswordIsValid
                  ? 'bg-white border-2 border-[#675149]/30'
                  : 'bg-[#e11900]/10 border-[#E11900] focus:border-[#E11900]'
              }`}
            placeholder='비밀번호를 입력'
          />
          <button type='button' onClick={toggleCheckPasswordHandler}>
            {showPassword.showCheckPassword ? (
              <EyesIcon className='absolute right-17 top-14 mt-3' />
            ) : (
              <EyesHiddenIcon className='absolute right-16 top-10 mt-3' />
            )}
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
        <div className='inline-flex w-full box-border gap-7'>
          <CheckSquare onClick={toggleCheckAgeHandler} checked={checkSquare.ageSquare} />
          <p
            className='text-[#675149] mt-3 rounded-10 text-[12px] 
                font-paragraph--sm text-left not-italic'
          >
            만 14세 이상입니다(필수)
          </p>
        </div>

        <div className='inline-flex w-full gap-7'>
          <CheckSquare onClick={toggleCheckAdmitHandler} checked={checkSquare.admitSquare} />
          <p
            className='text-[#675149] mt-3 rounded-10 text-[12px] 
                font-paragraph--sm text-left not-italic'
          >
            편지 알림 이메일 수신 동의 (필수)
          </p>
        </div>

        {/* sign up */}
        {/* 활성화 처리 해야됨 */}
        <button
          className={`flex w-342 h-50  mt-13 justify-center items-center 
           rounded-10 text-[16px] font-label--md text-left not-italic text-[#FFFCF7]
          bg-[#675149] 
          ${signUpIsValid ? 'bg-[#675149] hover:bg-[#2D2421]' : 'bg-[#707070] '}`}
          disabled={!signUpIsValid}
        >
          간편가입 완료
        </button>
      </form>
    </main>
  );
};

export default JoinPassword;
