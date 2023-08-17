import React, { useState } from 'react';
import Layout from '../../layouts/layout';
import { ComponentType } from '../../../pages/letter/new';
import BigCheckIcon from '../../../public/icons/bigcheck.svg';
import { useMutation } from 'react-query';
import { postSend } from '@/apis/postSend';
import { postSendGptReply } from '@/apis/postSendGptReply';

type SendProps = {
  componentChangeHandler: (ComponentType: ComponentType, load?: LoadType) => void;
  title: string;
  contents: string;
  load?: LoadType;
  selectId: number;
};

type LoadType = {
  id: number;
  title: string;
  contents: string;
  envelopType: number;
  letterType: string;
  senderId: number;
  receiverId: number | null;
  read: boolean;
};

const ResponseSelect: React.FC<SendProps> = ({ componentChangeHandler, title, contents, load, selectId }) => {
  const [envelopType, setEnvelopType] = useState(1);
  const [check, setCheck] = useState({
    envelope1: true,
    envelope2: false,
    envelope3: false,
    envelope4: false,
  });

  const togglePasswordHandler = (num: number) => {
    setCheck({
      envelope1: num === 1,
      envelope2: num === 2,
      envelope3: num === 3,
      envelope4: num === 4,
    });
    setEnvelopType(num);
  };

  //편지답장 발송하기
  const newSendMutation = useMutation(postSend);
  //const newSendGptReplyMutation = useMutation(postSendGptReply);
  const newSendHandler = () => {
    newSendMutation.mutate(
      { title, contents, envelopType, originalLetterId: selectId, letterId: load?.id, letterType: load?.letterType },
      {
        onSuccess: () => {
          componentChangeHandler('Complete');
        },
        onError: () => {
          alert('버튼 다시 눌러주세요!');
          console.log('newSendMutation 에러');
        },
      },
    );
    // newSendGptReplyMutation.mutate(
    //   { title, contents, envelopType },
    //   {
    //     onSuccess: () => {
    //       componentChangeHandler('Complete');
    //     },
    //     onError: () => {
    //       alert('버튼 다시 눌러주세요!');
    //       console.log('newLetterGptReplyHandler 에러');
    //     },
    //   },
    // );
    //이 부분 수정 필요!
  };

  return (
    <Layout onlyUser>
      <main className='flex justify-center'>
        <div>
          <p className='text-primary text-center font-heading--md tablet:font-heading--lg desktop:font-heading--xl'>
            편지 봉투를 선택하세요
          </p>
          <div className='mx-51 mt-62 tablet:mx-335 font-[KCC-eunyoung] leading-10 desktop:leading-16 desktop:grid desktop:grid-cols-2 desktop:gap-x-76 desktop:gap-y-96'>
            <div
              className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
              style={{ backgroundImage: `url('/imgs/envelope1.jpg')` }}
            >
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                onClick={() => togglePasswordHandler(1)}
              >
                {check.envelope1 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-24 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                <p className='ml-22 desktop:ml-34'>편지 제목</p>
                <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
              </div>
            </div>
            <div
              className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
              style={{ backgroundImage: `url('/imgs/envelope2.jpg')` }}
            >
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                onClick={() => togglePasswordHandler(2)}
              >
                {check.envelope2 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-24 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                <p className='ml-22 desktop:ml-34'>편지 제목</p>
                <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
              </div>
            </div>
            <div
              className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
              style={{ backgroundImage: `url('/imgs/envelope3.jpg')` }}
            >
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                onClick={() => togglePasswordHandler(3)}
              >
                {check.envelope3 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-24 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                <p className='ml-22 desktop:ml-34'>편지 제목</p>
                <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
              </div>
            </div>
            <div
              className='w-229 h-107 mb-16 bg-cover relative desktop:w-362 desktop:h-169 desktop:mb-0'
              style={{ backgroundImage: `url('/imgs/envelope4.jpg')` }}
            >
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60 desktop:w-362 desktop:h-169'
                onClick={() => togglePasswordHandler(4)}
              >
                {check.envelope4 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100 desktop:top-55 desktop:left-150'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-24 mt-16 desktop:ml-34 desktop:mt-25'>Letter from 닉네임</p>
                <p className='ml-22 desktop:ml-34'>편지 제목</p>
                <p className='ml-179 mt-39 desktop:ml-282 desktop:mt-62'>2023 08 09</p>
                <p className='ml-179 desktop:ml-282'>Pm 14 : 02</p>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center mt-62 w-full'>
            <button
              className='w-130 py-8 justify-center items-center border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:text-hover'
              type='button'
              onClick={newSendHandler}
            >
              발송하기
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ResponseSelect;