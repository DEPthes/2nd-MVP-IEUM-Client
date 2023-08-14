import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MailsIcon from '../../../public/icons/mails.svg';
import Layout from '../../layouts/layout';
import AutoResizableTextarea from '../../autoResizableTextarea';
import { ComponentType } from '../../../pages/letter/new';
import useAlert from '../../../recoil/alert/useAlert';
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
  componentChangeHandler: (ComponentType: ComponentType) => void;
};

const SendWriting: React.FC<SendProps> = ({ componentChangeHandler }) => {
  const MAX_LENGTH_TITLE = 10; //편지 제목 글자수 제한
  const MAX_LENGTH = 3500; //편지 내용 글자수 제한
  const { showAlert } = useAlert();
  const router = useRouter();
  const [inputCount, setInputCount] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  //편지 제목 글자수 제한
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH_TITLE) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH_TITLE);
    }
  };

  //편지 내용 글자수 계산
  const onTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(event.target.value.length);
  };

  //임시저장된 편지 모달창 띄우기
  const handleButtonClick = () => {
    setShow(true);
  };

  //임시저장 하나만 선택
  const handleButtonClicks = (id: number | null) => {
    setSelectedButtonId(id);
  };

  return (
    <Layout>
      <main className='flex justify-center'>
        <form className='w-334 mt-40 mx-24 tablet:w-900 tablet:mt-56 tablet:mx-32 desktop:w-[1280px] desktop:mt-64 desktop:mx-64'>
          <p className='text-primary text-center font-heading--lg desktop:font-heading--xl'>편지 작성</p>
          <input
            className='flex items-center self-stretch w-full mt-24 p-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md'
            type='text'
            placeholder='편지 제목을 입력하세요.'
            maxLength={MAX_LENGTH_TITLE}
            onChange={onInputHandler}
          />
          <AutoResizableTextarea
            className='flex items-start self-stretch w-full h-440 mt-24 py-8 px-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md resize-none'
            placeholder='편지 내용을 입력하세요.'
            maxLength={MAX_LENGTH}
            onInput={onTextareaHandler}
            style={{ minHeight: '456px' }}
          />
          <span>{inputCount}자/3500자</span>
          <div className='flex justify-center items-center mt-56 w-full'>
            <button
              className='w-130 py-6 mr-16 justify-center items-center border-primary rounded-10 border-1 text-primary bg-tertiary gap-4 font-label--md hover:text-hover'
              type='button'
              onClick={() =>
                showAlert({
                  title: '임시저장이 완료되었어요!',
                  actions: [
                    { title: '편지 계속 쓰기', style: 'primary', handler: null },
                    { title: '홈으로 돌아가기', style: 'tertiary', handler: () => router.push('/') },
                  ],
                })
              }
            >
              임시 저장
            </button>
            <button
              className='w-130 py-6 mr-17 justify-center items-center border-primary rounded-10 border-1 text-secondary bg-primary gap-4 font-label--md hover:bg-hover'
              type='button'
              onClick={() => componentChangeHandler('Select')}
              /*
              showAlert({
                    title: '적절하지 못한 문구가 포함되어 있어요.\n편지 발송을 원한다면 문구 수정이 필요해요.',
                    actions: [
                      { title: '수정하기', style: 'primary', handler: null },
                      { title: '임시저장하기', style: 'tertiary', handler: null },
                    ],
                  })
              */
            >
              다음 단계
            </button>
            <button type='button' onClick={handleButtonClick}>
              <MailsIcon />
            </button>
          </div>
        </form>
      </main>
      {show && (
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
      )}
    </Layout>
  );
};

export default SendWriting;
