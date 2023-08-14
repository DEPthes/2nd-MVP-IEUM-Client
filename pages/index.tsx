import Layout from '@/components/layouts/layout';
import useLettersQuery from '@/hooks/queries/useLettersQuery';
import useAlert from '@/recoil/alert/useAlert';
import { cls } from '@/utils/cls';

export default function Home() {
  const { showAlert } = useAlert();
  const { letters, isLoading, isError } = useLettersQuery('read', 'ss');
  // console.log(a.letters);
  return (
    <Layout>
      <div className={cls('flex justify-center items-center h-screen font-heading--3xl')}>
        <button
          onClick={() =>
            showAlert({
              title: '로그아웃 하시겠어요?',
              actions: [
                { title: '예', style: 'primary', handler: null },
                { title: '아니오', style: 'tertiary', handler: null },
              ],
            })
          }
        >
          눌러
        </button>
      </div>
    </Layout>
  );
}
