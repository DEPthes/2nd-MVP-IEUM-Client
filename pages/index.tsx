import useAlert from '@/recoil/alert/useAlert';
import { cls } from '@/utils/cls';
import { HTMLAttributes } from 'react';

export default function Home() {
  const { showAlert } = useAlert();
  return (
    <div className={cls('flex justify-center items-center h-screen')}>
      <input />
      <button
        className=' font-heading--2xl'
        onClick={() =>
          showAlert({
            alertViewTitle: '제목',
            alertViewDesc: '내용',
            closeWithClickBackdrop: true,
            alertActions: [{ title: '확인', style: 'primary', handler: null }],
          })
        }
      >
        로그아웃하시겠어요?
      </button>
    </div>
  );
}
