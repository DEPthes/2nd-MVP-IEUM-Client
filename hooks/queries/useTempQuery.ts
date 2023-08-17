import { getTemp } from '@/apis/getTemp';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const TEMP_QUERY_KEY = 'tempQuery';

export default function useTempQuery(letterId: number) {
  const accessToken = authToken.getToken();
  const {
    data: temp,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: [TEMP_QUERY_KEY],
    queryFn: () => withVerify(() => getTemp(letterId, accessToken)),
    select: (res) => res.data.information,
    onError: useApiError,
    enabled: letterId !== 0,
  });
  return { temp, loading, error };
}
