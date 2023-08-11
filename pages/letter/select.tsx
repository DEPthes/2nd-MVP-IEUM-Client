import React, { useState } from 'react';
import Layout from '../../components/layouts/layout';
import BigCheckIcon from '../../public/icons/bigcheck.svg';
import Envelope1Img from '../../public/imgs/envelope1.svg';
import Envelope2Img from '../../public/imgs/envelope2.svg';
import Envelope3Img from '../../public/imgs/envelope3.svg';
import Envelope4Img from '../../public/imgs/envelope4.svg';

export default function Select() {
  const [check, setCheck] = useState({
    envelope1: false,
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
  };

  return (
    <Layout>
      <main className='flex justify-center'>
        <div className='w-390 mt-23 mx-53'>
          <p className='text-primary text-center font-heading--md'>편지 봉투를 선택하세요</p>
          <div className='mx-80 mt-62'>
            <div className='w-229 h-107 mb-16 bg-[#987A6F] rounded-11 relative'>
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60'
                onClick={() => togglePasswordHandler(1)}
              >
                {check.envelope1 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-22 mt-16'>Letter from 닉네임</p>
                <p className='ml-22'>편지 제목</p>
                <p className='ml-179 mt-39'>2023 08 09</p>
                <p className='ml-179'>Pm 14 : 02</p>
              </div>
              <Envelope1Img />
            </div>
            <div className='w-229 h-107 mb-16 bg-[#987A6F] rounded-11 relative'>
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60'
                onClick={() => togglePasswordHandler(2)}
              >
                {check.envelope2 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-22 mt-16'>Letter from 닉네임</p>
                <p className='ml-22'>편지 제목</p>
                <p className='ml-179 mt-39'>2023 08 09</p>
                <p className='ml-179'>Pm 14 : 02</p>
              </div>
              <Envelope2Img />
            </div>
            <div className='w-229 h-107 mb-16 bg-[#987A6F] rounded-11 relative'>
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60'
                onClick={() => togglePasswordHandler(3)}
              >
                {check.envelope3 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-22 mt-16'>Letter from 닉네임</p>
                <p className='ml-22'>편지 제목</p>
                <p className='ml-179 mt-39'>2023 08 09</p>
                <p className='ml-179'>Pm 14 : 02</p>
              </div>
              <Envelope3Img />
            </div>
            <div className='w-229 h-107 bg-[#987A6F] rounded-11 relative'>
              <div
                className='absolute w-229 h-107 rounded-11 cursor-pointer hover:bg-[#675149]/60'
                onClick={() => togglePasswordHandler(4)}
              >
                {check.envelope4 ? (
                  <div className='absolute top-24 left-85 flex justify-center items-center w-60 h-60 bg-[#675149] rounded-100'>
                    <BigCheckIcon />
                  </div>
                ) : (
                  ''
                )}
                <p className='ml-22 mt-16'>Letter from 닉네임</p>
                <p className='ml-22'>편지 제목</p>
                <p className='ml-179 mt-39'>2023 08 09</p>
                <p className='ml-179'>Pm 14 : 02</p>
              </div>
              <Envelope4Img />
            </div>
          </div>
          <div className='flex justify-center items-center mt-62 w-full'>
            <button
              className='px-15 py-8 mr-24 justify-center items-center border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:text-hover'
              type='button'
            >
              사람에게 보내기
            </button>
            <button
              className='px-20 py-8 justify-center items-center border-primary rounded-10 text-tertiary bg-primary gap-4 font-label--md hover:text-hover'
              type='button'
            >
              AI에게 보내기
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
