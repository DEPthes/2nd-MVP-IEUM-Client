import React, { useState } from 'react';
import SendWriting from '../../components/pages/send/send-Writing';
import SendSelect from '../../components/pages/send/send-Select';
import SendComplete from '../../components/pages/send/send-Complete';

export type ComponentType = 'Writing' | 'Select' | 'Complete';

const Send = () => {
  const [component, setComponent] = useState<ComponentType>('Writing');

  const componentChangeHandler = (ComponentType: ComponentType) => {
    setComponent(ComponentType);
  };

  return (
    <div>
      {component === 'Writing' && <SendWriting componentChangeHandler={componentChangeHandler} />}
      {component === 'Select' && <SendSelect componentChangeHandler={componentChangeHandler} />}
      {component === 'Complete' && <SendComplete />}
    </div>
  );
};

export default Send;
