import { getTemps } from '@/apis/getTemps';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';

export const TEMPS_QUERY_KEY = 'tempsQuery';

export default function useTempsQuery() {
  const {
    data: temps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TEMPS_QUERY_KEY],
    queryFn: () => withVerify(() => getTemps()),
    select: (res) => res.data.information,
    onError: useApiError,
  });
  return { temps, isLoading, isError };
}
