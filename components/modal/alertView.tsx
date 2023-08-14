import React from 'react';
import ModalView from './modalView';
import useAlert from '@/recoil/alert/useAlert';
import AlertAction from './alertAction';
import BackDrop from './backdrop';
// import CancleIcon from '../../public/icons/cancle.svg';

export default function AlertView() {
  const {
    alert: {
      show,
      alertOptions: { title, actions, closeWithClickBackdrop },
    },
    closeAlert,
  } = useAlert();

  return (
    <>
      {show && (
        <BackDrop onBackdropClick={closeWithClickBackdrop ? closeAlert : undefined}>
          <ModalView className='relative flex flex-col items-center justify-between box-border bg-tertiary rounded-10 w-314 h-213 px-24 py-40 desktop:w-372 desktop:h-236 desktop:px-22 desktop:py-52'>
            {/* <button onClick={closeAlert} className='absolute top-16 right-16'>
              <CancleIcon width='16' height='16' />
            </button> */}
            <div className={'p-4 text-primary font-label--md desktop:font-heading--md'}>{title}</div>
            <div className=' flex justify-center items-center gap-10 w-full desktop:gap-7'>
              {actions.map((action, i) => (
                <AlertAction key={i} {...action} closeAlert={closeAlert} />
              ))}
            </div>
          </ModalView>
        </BackDrop>
      )}
    </>
  );
}
