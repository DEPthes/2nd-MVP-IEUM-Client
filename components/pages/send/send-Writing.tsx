import React, { useState, TextareaHTMLAttributes } from 'react';
import MailsIcon from '../../../public/icons/mails.svg';
import Layout from '../../layouts/layout';
import AutoResizableTextarea from '../../autoResizableTextarea';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  textareaOnChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; //onChange를 내부적으로 사용하므로 매핑해서 써야됨
  selectChangeHandler: () => void;
}

const SendWriting: React.FC<Props> = (props) => {
  const [inputCount, setInputCount] = useState(0);
  const MAX_LENGTH = 3500;

  //글자수 계산
  const onTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(event.target.value.length);

    if (props.textareaOnChange) {
      props.textareaOnChange(event);
    }
  };

  return (
    <Layout>
      <main className='flex justify-center'>
        <form className='w-358 mt-24 mx-16'>
          <p className='text-primary text-center font-heading--lg'>편지 작성</p>
          <input
            className='flex items-center self-stretch w-full mt-24 p-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md'
            type='text'
            placeholder='편지 제목을 입력하세요.'
          />
          <AutoResizableTextarea
            className='flex items-start self-stretch w-full h-440 mt-24 py-8 px-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md resize-none'
            placeholder='편지 내용을 입력하세요.'
            maxLength={MAX_LENGTH}
            onInput={onTextareaHandler}
            style={{ minHeight: '456px' }}
          />
          <span>{inputCount}자/3500자</span>
          <div className='flex justify-center items-center mt-40 w-full'>
            <button
              className='px-35 py-6 mr-16 justify-center items-center border-primary rounded-10 border-1 text-primary bg-tertiary gap-4 font-label--md hover:text-hover'
              type='button'
            >
              임시 저장
            </button>
            <button
              className='px-35 py-6 mr-17 justify-center items-center border-primary rounded-10 border-1 text-secondary bg-primary gap-4 font-label--md hover:bg-hover'
              type='button'
              onClick={props.selectChangeHandler}
            >
              다음 단계
            </button>
            <button type='button'>
              <MailsIcon />
            </button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default SendWriting;
