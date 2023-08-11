import React, { useState } from 'react';
import SendWriting from '../../components/pages/send/send-Writing';
import SendSelect from '../../components/pages/send/send-Select';
import SendComplete from '../../components/pages/send/send-Complete';

const Send = () => {
  const [component, setComponent] = useState('Writing');

  const selectChangeHandler = () => {
    setComponent('Select');
  };

  const completeChangeHandler = () => {
    setComponent('Complete');
  };

  return (
    <div>
      {component === 'Writing' ? (
        <SendWriting selectChangeHandler={selectChangeHandler} />
      ) : component === 'Select' ? (
        <SendSelect completeChangeHandler={completeChangeHandler} />
      ) : component === 'Complete' ? (
        <SendComplete />
      ) : (
        ''
      )}
    </div>
  );
};

export default Send;
