import React, { useState } from 'react';
import SendWriting from '../../components/pages/send/send-Writing';
import SendSelect from '../../components/pages/send/send-Select';
import SendComplete from '../../components/pages/send/send-Complete';

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

const LetterNew = () => {
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
        <SendWriting
          componentChangeHandler={componentChangeHandler}
          newtitle={setTitle}
          newcontents={setContents}
          newload={setLoad}
        />
      )}
      {component === 'Select' && (
        <SendSelect componentChangeHandler={componentChangeHandler} title={title} contents={contents} load={load} />
      )}
      {component === 'Complete' && <SendComplete />}
    </div>
  );
};

export default LetterNew;
