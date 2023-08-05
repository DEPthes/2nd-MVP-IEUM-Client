import useAlert from '@/recoil/alert/useAlert';

export default function Home() {
  const { showAlert } = useAlert();
  return (
    <div className='flex justify-center items-center h-screen'>
      <button
        className=' text-16 font-bold'
        onClick={() =>
          showAlert({
            alertViewTitle: '제목',
            alertViewDesc: '내용',
            closeWithClickBackdrop: true,
            alertActions: [{ title: '확인', style: 'primary', handler: null }],
          })
        }
      >
        누르셈
      </button>
    </div>
  );
}
