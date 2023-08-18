import React from 'react';

const envelopeImagePaths: any = {
  1: '/imgs/envelope1.jpg',
  2: '/imgs/envelope2.jpg',
  3: '/imgs/envelope3.jpg',
  4: '/imgs/envelope4.jpg',
};

const Letter = () => {
  function selectEnvelopeType() {
    const envelopeImagePath = envelopeImagePaths;
    if (envelopeImagePath) {
      return `url(${envelopeImagePath})`;
    }
  }

  const envelopeStyle = {
    backgroundImage: selectEnvelopeType(),
  };
  return (
    <li
      className='flex flex-col w-[410px] h-[191.572px] justify-end items-end mt-10 px-8 py-4 border-black rounded-10 bg-cover bg-no-repeat bg-center'
      style={envelopeStyle}
    >
      <p className='mr-auto mt-20 flex items-stretch text-[10px] text-[#000] font-normal'></p> {/* 닉네임  */}
      <p className='flex items-stretch flex-col mr-auto mb-auto text-10 text-[#000] font-normal'></p> {/* 제목 */}
      <p className='text-[#000] text-10 flex items-stretch flex-col font-normal'></p> {/* 날짜 */}
      <p className='text-[#000] text-10 mb-10 flex items-stretch flex-col font-normal'></p> {/* 시간 */}
    </li>
  );
};

export default Letter;
