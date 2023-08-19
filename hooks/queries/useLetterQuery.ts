import { getLetterContent } from '@/apis/getLetterContent';
import { useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';

export const LETTER_QUERY_KEY = 'letteruery';

export default function useLetterQuery(id: number) {
  const {
    data: letter,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LETTER_QUERY_KEY, id],
    queryFn: () => withVerify(() => getLetterContent(id)),
    select: (res) => res.data.information,
    refetchOnMount: 'always',
    staleTime: 1000 * 20,
  });
  return { letter, isLoading, isError };
}
