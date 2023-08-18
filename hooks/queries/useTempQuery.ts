import { getTemp } from '@/apis/getTemp';
import { useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const TEMP_QUERY_KEY = 'tempQuery';

export default function useTempQuery(letterId: number) {
  const accessToken = authToken.getToken();
  const {
    data: temp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TEMP_QUERY_KEY, letterId],
    queryFn: () => withVerify(() => getTemp(letterId, accessToken)),
    select: (res) => res.data.information,
    enabled: letterId !== 0,
  });
  return { temp, isLoading, isError };
}
