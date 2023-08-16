import React, { useState } from 'react';
import BackDrop from '../../modal/backdrop';
import ModalView from '../../modal/modalView';
import RecordIcon from '../../../public/icons/record.svg';
import CircleIcon from '../../../public/icons/cirlce-circle.svg';
import overScroll from '../../../styles/overScroll.module.css';
import useTempsQuery from '@/hooks/queries/useTempsQuery';
import useTempQuery from '@/hooks/queries/useTempQuery';

type SendProps = {
  setShow: (x: boolean) => void;
  onLoadChange: (load: LoadType) => void;
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

const SendTemp: React.FC<SendProps> = ({ setShow, onLoadChange }) => {
  const [selectedButtonId, setSelectedButtonId] = useState<number>(0);
  const { temps, isLoading, isError } = useTempsQuery();
  const { temp, loading, error } = useTempQuery(selectedButtonId);
  const [load, setLoad] = useState<LoadType>({
    id: 0,
    title: '',
    contents: '',
    envelopType: 1,
    letterType: 'TEMP',
    senderId: 2,
    receiverId: null,
    read: false,
  });

  if (isLoading) {
    console.log('로딩');
  }

  if (isError) {
    console.log('에러');
  }

  //임시저장 하나만 선택
  const handleButtonClicks = (id: number) => {
    setSelectedButtonId(id);
  };

  const handleLoadButtonClick = () => {
    if (temp !== undefined) {
      setLoad((prevLoad) => {
        return {
          ...prevLoad,
          id: temp.id,
          title: temp.title,
          contents: temp.contents,
          envelopType: temp.envelopType,
          letterType: temp.letterType,
          senderId: temp.senderId,
          receiverId: temp.receiverId,
          read: temp.read,
        };
      });
      onLoadChange(load);
    }
    console.log(load);

    if (loading) {
      console.log('로딩');
    }

    if (error) {
      console.log('에러');
    }
  };

  return (
    <BackDrop>
      <ModalView className='relative flex flex-col items-center justify-between box-border bg-tertiary rounded-10 w-329 px-12 py-24 desktop:w-375 desktop:px-24 desktop:py-40'>
        <div className='text-primary font-label--md desktop:font-heading--md'>임시저장된 편지</div>
        <div className={overScroll.scroll}>
          <div className='mt-24 w-305 h-120 bg-[#F0E4D1] overflow-auto desktop:w-327 desktop:h-120 desktop:mt-48'>
            {temps?.map((data) => (
              <div key={data.letterId} className='flex items-center flex-row px-12 py-8'>
                <button className='mr-9' onClick={() => handleButtonClicks(data.letterId)}>
                  {selectedButtonId === data.letterId ? <RecordIcon /> : <CircleIcon />}
                </button>
                <div className='text-primary font-heading--sm'>{data.title}</div>
                <div className='ml-auto text-primary font-label--sm'>
                  {data.modifiedAt.substring(0, 11).replace('-', '.')}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center items-center w-full mt-24 desktop:mt-48'>
          <button
            className='w-130 h-40 gap-4 rounded-10 bg-primary text-tertiary font-label--md mr-45 desktop:w-160 desktop:h-40 desktop:mr-8 hover:bg-hover hover:border-hover disabled:bg-[#707070] disabled:border-[#707070]'
            onClick={handleLoadButtonClick}
            disabled={selectedButtonId === 0}
          >
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
