import { getTempsReply } from '@/apis/getTempsReply';
import { useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const TEMPS_REPLY_QUERY_KEY = 'tempsreplyQuery';

export default function useTempsReplyQuery(letterId: number) {
  const accessToken = authToken.getToken();
  const {
    data: temps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TEMPS_REPLY_QUERY_KEY, letterId],
    queryFn: () => withVerify(() => getTempsReply(letterId, accessToken)),
    select: (res) => res.data.information,
  });
  return { temps, isLoading, isError };
}
