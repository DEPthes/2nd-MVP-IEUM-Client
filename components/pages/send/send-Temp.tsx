import React, { useState } from 'react';
import BackDrop from '../../modal/backdrop';
import ModalView from '../../modal/modalView';
import RecordIcon from '../../../public/icons/record.svg';
import CircleIcon from '../../../public/icons/cirlce-circle.svg';
import overScroll from '../../../styles/overScroll.module.css';

const Data = [
  {
    id: 1,
    title: '편지제목1',
    date: '2023.08.07',
  },
  {
    id: 2,
    title: '편지제목2',
    date: '2023.08.07',
  },
  {
    id: 3,
    title: '편지제목3',
    date: '2023.08.07',
  },
  {
    id: 4,
    title: '편지제목4',
    date: '2023.08.07',
  },
];

type SendProps = {
  setShow: (x: boolean) => void;
};

const SendTemp: React.FC<SendProps> = ({ setShow }) => {
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  //임시저장 하나만 선택
  const handleButtonClicks = (id: number | null) => {
    setSelectedButtonId(id);
  };

  return (
    <BackDrop>
      <ModalView className='relative flex flex-col items-center justify-between box-border bg-tertiary rounded-10 w-329 px-12 py-24 desktop:w-375 desktop:px-24 desktop:py-40'>
        <div className='text-primary font-label--md desktop:font-heading--md'>임시저장된 편지</div>
        <div className={overScroll.scroll}>
          <div className='mt-24 w-305 h-120 bg-[#F0E4D1] overflow-auto desktop:w-327 desktop:h-120 desktop:mt-48'>
            {Data.map((data) => (
              <div key={data.id} className='flex items-center flex-row px-12 py-8'>
                <button className='mr-9' onClick={() => handleButtonClicks(data.id)}>
                  {selectedButtonId === data.id ? <RecordIcon /> : <CircleIcon />}
                </button>
                <div className='text-primary font-heading--sm'>{data.title}</div>
                <div className='ml-auto text-primary font-label--sm'>{data.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center items-center w-full mt-24 desktop:mt-48'>
          <button className='w-130 h-40 gap-4 rounded-10 bg-primary text-tertiary font-label--md mr-45 desktop:w-160 desktop:h-40 desktop:mr-8'>
            불러오기
          </button>
          <button
            className='w-130 h-40 gap-4 rounded-10 border-primary border-1 text-primary font-label--md desktop:w-160 desktop:h-40'
            type='button'
            onClick={() => setShow(false)}
          >
            닫기
          </button>
        </div>
      </ModalView>
    </BackDrop>
  );
};

export default SendTemp;
