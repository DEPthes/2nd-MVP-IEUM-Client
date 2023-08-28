import { getEmailDuplicated } from '@/apis/getEmailDuplicated';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';

// 고유한 키
export const EMAILDUPLICATED_QUERY_KEY = 'EmailDuplicated';

export default function useEmailDuplicated(email: string) {
  const { handleApiError } = useApiError();
  const {
    data: EmailDuplicated,
    isLoading,
    isError,
  } = useQuery({
    // 쿼리 옵션
    queryKey: [EMAILDUPLICATED_QUERY_KEY], // 고유한 key
    queryFn: () => getEmailDuplicated(email), // api 함수
    select: (res) => res.data.information, // 데이터 정제
    onError: handleApiError(),
  });
  return { EmailDuplicated, isLoading, isError };
}
