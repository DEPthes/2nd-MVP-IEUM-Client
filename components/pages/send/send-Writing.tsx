import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MailsIcon from '../../../public/icons/mails.svg';
import Layout from '../../layouts/layout';
import AutoResizableTextarea from '../../autoResizableTextarea';
import { ComponentType } from '../../../pages/letter/new';
import useAlert from '../../../recoil/alert/useAlert';
import SendTemp from './send-Temp';
import { postTemp } from '@/apis/postTemp';
import { postCheck } from '@/apis/postCheck';
import { useMutation } from 'react-query';
import Loading from '../../../public/icons/loading2.svg';

type SendProps = {
  componentChangeHandler: (ComponentType: ComponentType) => void;
  newtitle: (title: string) => void;
  newcontents: (title: string) => void;
  newload: (load: LoadType | undefined) => void;
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

const SendWriting: React.FC<SendProps> = ({ componentChangeHandler, newtitle, newcontents, newload }) => {
  const MAX_LENGTH_TITLE = 28; //편지 제목 글자수 제한
  const MAX_LENGTH = 3500; //편지 내용 글자수 제한
  const { showAlert } = useAlert();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [inputCount, setInputCount] = useState(0);
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState<LoadType>();
  const newTempMutation = useMutation(postTemp);
  const newCheckMutation = useMutation(postCheck);

  //다음 단계 버튼
  const handleSendButtonClick = () => {
    newtitle(title);
    newcontents(contents);

    newCheckMutation.mutate(
      { title, contents },
      {
        onSuccess: (response) => {
          if (response.data.information.prohibition === 0) {
            newload(load);
            componentChangeHandler('Select');
          } else if (response.data.information.prohibition === 1) {
            showAlert({
              title: (
                <div className='flex flex-col items-center'>
                  <span>적절하지 못한 문구가 포함되어 있어요.</span>
                  <span>편지 발송을 원한다면 문구 수정이 필요해요.</span>
                </div>
              ),
              actions: [
                { title: '수정하기', style: 'primary', handler: null },
                { title: '임시저장하기', style: 'tertiary', handler: newTempHandler },
              ],
            });
          }
        },
        onError: () => {
          showAlert({
            title: '다시 작성해주세요',
            actions: [
              { title: '수정하기', style: 'primary', handler: null },
              { title: '임시저장하기', style: 'tertiary', handler: newTempHandler },
            ],
          });
          console.log('newCheckMutation 에러');
        },
      },
    );
  };

  //임시저장 버튼
  const newTempHandler = () => {
    newTempMutation.mutate(
      { originalLetterId: null, title, contents },
      {
        onSuccess: () => {
          showAlert({
            title: '임시저장이 완료되었어요!',
            actions: [
              { title: '편지 계속 쓰기', style: 'primary', handler: null },
              { title: '홈으로 돌아가기', style: 'tertiary', handler: () => router.push('/') },
            ],
          });
        },
        onError: () => {
          alert('버튼 다시 눌러주세요!');
          console.log('newTempHandler 에러');
        },
      },
    );
  };

  //편지 제목 글자수 제한 & 제목 저장
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH_TITLE) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH_TITLE);
    }
    const target = event.target.value;
    setTitle(target);
  };

  //편지 내용 글자수 계산 & 내용 저장
  const onTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value.length > MAX_LENGTH) {
      event.target.value = event.target.value.slice(0, MAX_LENGTH);
    }
    setInputCount(event.target.value.length);
    const target = event.target.value;
    setContents(target);
  };

  //임시저장된 편지 모달창 띄우기
  const handleButtonClick = () => {
    setShow(true);
  };

  //임시저장 불러오기
  const handleTempLoadChange = (newLoad: LoadType) => {
    setTitle(newLoad.title);
    setContents(newLoad.contents);
    const updatedLoad = {
      id: newLoad.id,
      title: newLoad.title,
      contents: newLoad.contents,
      envelopType: newLoad.envelopType,
      letterType: newLoad.letterType,
      senderId: newLoad.senderId,
      receiverId: newLoad.receiverId,
      read: newLoad.read,
    };
    setLoad(updatedLoad);
  };

  return (
    <Layout onlyUser>
      <main className='flex justify-center'>
        {newCheckMutation.isLoading ? (
          <div className='mt-150'>
            <Loading />
          </div>
        ) : (
          <form className='w-334 tablet:w-900 desktop:w-[1280px]'>
            <p className='text-primary text-center font-heading--lg desktop:font-heading--xl'>편지 작성</p>
            <input
              className='flex items-center self-stretch w-full mt-24 p-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md'
              type='text'
              placeholder='편지 제목을 입력하세요.'
              minLength={1}
              maxLength={MAX_LENGTH_TITLE}
              value={title}
              onChange={onInputHandler}
            />
            <AutoResizableTextarea
              className='flex items-start self-stretch w-full h-440 mt-24 py-8 px-12 border-primary/30 rounded-8 border-2 outline-none placeholder-text_secondary bg-tertiary font-paragraph--md resize-none'
              placeholder='편지 내용을 입력하세요.'
              minLength={1}
              maxLength={MAX_LENGTH}
              onInput={onTextareaHandler}
              value={contents}
              style={{ minHeight: '456px' }}
            />
            <span className='float-right font-paragraph--sm text-primary tablet:font-paragraph--md'>
              {inputCount}자/3500자
            </span>
            <div className='flex justify-center items-center mt-40 w-full tablet:mt-56'>
              <button
                className='w-130 py-6 mr-16 justify-center items-center border-primary rounded-10 border-1 text-primary bg-tertiary gap-4 font-label--md hover:text-hover'
                type='button'
                disabled={!(title.length > 0 && contents.length > 0)}
                onClick={newTempHandler}
              >
                임시 저장
              </button>
              <button
                className='w-130 py-6 mr-17 justify-center items-center border-primary rounded-10 border-1 text-secondary bg-primary gap-4 font-label--md hover:bg-hover hover:border-hover disabled:bg-[#707070] disabled:border-[#707070]'
                type='button'
                disabled={!(title.length > 0 && contents.length > 0)}
                onClick={handleSendButtonClick}
              >
                다음 단계
              </button>
              <button type='button' onClick={handleButtonClick}>
                <MailsIcon />
              </button>
            </div>
          </form>
        )}
      </main>
      {show && <SendTemp setShow={setShow} onLoadChange={handleTempLoadChange} />}
    </Layout>
  );
};

export default SendWriting;
