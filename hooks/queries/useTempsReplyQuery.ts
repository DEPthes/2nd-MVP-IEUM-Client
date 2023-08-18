import { getTempsReply } from '@/apis/getTempsReply';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const TEMPS_REPLY_QUERY_KEY = 'tempsreplyQuery';

export default function useTempsReplyQuery() {
  const accessToken = authToken.getToken();
  const {
    data: temps,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [TEMPS_REPLY_QUERY_KEY],
    queryFn: () => withVerify(() => getTempsReply(accessToken)),
    select: (res) => res.data.information,
    onError: useApiError,
    refetchOnMount: 'always',
  });
  return { temps, isLoading, isError };
}
