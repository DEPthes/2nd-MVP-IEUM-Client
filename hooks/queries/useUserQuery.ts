import { getUser } from '@/apis/getUser';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';
import { useQuery } from 'react-query';

export const USER_QUERY_KEY = 'userQuery';
export default function useUserQuery(onError?: () => void) {
  const accessToken = authToken.getToken();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: () => withVerify(() => getUser(accessToken || '')),
    select: (res) => res.data,
    onError, // useUser에서의 401에러는 공통 에러 처리 로직을 따르지 않는다.
    staleTime: 1000 * 20, // 20초 동안 유효한 데이터
    refetchInterval: 1000 * 60 * 30, // 30분마다 refetch
  });
  return { user, isLoading, isError };
}
