import { getLetterContent } from '@/apis/getLetterContent';
import { useQuery, useQueryClient } from 'react-query';
import { withVerify } from '@/apis/withVerify';
import { LETTERS_QUERY_KEY } from './useLettersQuery';

export const LETTER_QUERY_KEY = 'letteruery';

export default function useLetterQuery(id: number) {
  const queryClient = useQueryClient();
  const {
    data: letter,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LETTER_QUERY_KEY, id],
    queryFn: () => withVerify(() => getLetterContent(id)),
    select: (res) => res.data.information,
    refetchOnMount: false,
    staleTime: Infinity, // 수정되거나 삭제될 일이 없기 때문에 무한정 캐시(5분)

    // 편지 읽음 성공 시 우체통 페이지에도 읽음 처리를 위해 캐시 무효화
    onSuccess: () => queryClient.invalidateQueries(LETTERS_QUERY_KEY),
  });
  return { letter, isLoading, isError };
}
