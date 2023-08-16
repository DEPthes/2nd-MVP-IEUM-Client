import { getTemp } from '@/apis/getTemp';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';

export const TEMP_QUERY_KEY = 'tempQuery';

export default function useTempQuery(letterId: number) {
  const {
    data: temp,
    isLoading: loading,
    isError: error,
  } = useQuery({
    queryKey: [TEMP_QUERY_KEY],
    queryFn: () => withVerify(() => getTemp(letterId)),
    select: (res) => res.data.information,
    onError: useApiError,
  });
  return { temp, loading, error };
}
