import { getTemps } from '@/apis/getTemps';
import { useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const TEMPS_QUERY_KEY = 'tempsQuery';

export default function useTempsQuery() {
  const accessToken = authToken.getToken();
  const {
    data: temps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TEMPS_QUERY_KEY],
    queryFn: () => withVerify(() => getTemps(accessToken)),
    select: (res) => res.data.information,
  });
  return { temps, isLoading, isError };
}
