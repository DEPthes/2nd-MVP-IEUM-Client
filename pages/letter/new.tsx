import React, { useState } from 'react';
import SendWriting from '../../components/pages/send/send-Writing';
import SendSelect from '../../components/pages/send/send-Select';
import SendComplete from '../../components/pages/send/send-Complete';

export type ComponentType = 'Writing' | 'Select' | 'Complete';

const LetterNew = () => {
  const [component, setComponent] = useState<ComponentType>('Writing');
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const componentChangeHandler = (ComponentType: ComponentType) => {
    setComponent(ComponentType);
  };

  return (
    <div>
      {component === 'Writing' && (
        <SendWriting componentChangeHandler={componentChangeHandler} newtitle={setTitle} newcontents={setContents} />
      )}
      {component === 'Select' && (
        <SendSelect componentChangeHandler={componentChangeHandler} newtitle={title} newcontents={contents} />
      )}
      {component === 'Complete' && <SendComplete />}
    </div>
  );
};

export default LetterNew;
