import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';
import { getNickname } from '@/apis/getNickname';

// 고유한 키
export const NICKNAME_QUERY_KEY = 'Nickname';

export default function useNickname() {
  const { handleError } = useApiError({ 500: () => console.log('ㅇㅇ') });
  const {
    data: Nickname,
    isLoading,
    isError,
  } = useQuery({
    // 쿼리 옵션
    queryKey: [NICKNAME_QUERY_KEY], // 고유한 key
    queryFn: () => getNickname(), // api 함수
    select: (res) => res.data.information, // 데이터 정제
    onError: handleError,
  });
  return { Nickname, isLoading, isError };
}
