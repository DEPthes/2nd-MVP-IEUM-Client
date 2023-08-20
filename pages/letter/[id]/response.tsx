import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ResponseWriting from '../../../components/pages/response/response-Writing';
import ResponseSelect from '../../../components/pages/response/response-Select';
import LetterComplete from '../../../components/pages/letter-Complete';

type Props = {};

export type ComponentType = 'Writing' | 'Select' | 'Complete';

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

export default function Response({}: Props) {
  const router = useRouter();
  const selectId = Number(router.query.id);
  const [component, setComponent] = useState<ComponentType>('Writing');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [load, setLoad] = useState<LoadType>();

  const componentChangeHandler = (ComponentType: ComponentType) => {
    setComponent(ComponentType);
  };

  return (
    <div>
      {component === 'Writing' && (
        <ResponseWriting
          componentChangeHandler={componentChangeHandler}
          newtitle={setTitle}
          newcontents={setContents}
          newload={setLoad}
          selectId={selectId}
        />
      )}
      {component === 'Select' && (
        <ResponseSelect
          componentChangeHandler={componentChangeHandler}
          title={title}
          contents={contents}
          load={load}
          selectId={selectId}
        />
      )}
      {component === 'Complete' && <LetterComplete />}
    </div>
  );
}
