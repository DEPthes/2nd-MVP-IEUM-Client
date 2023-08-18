import { LetterType, LettersResponse, getLetters } from '@/apis/getLetters';
import { useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';

export const LETTERS_QUERY_KEY = 'lettersQuery';
export default function useLettersQuery(type: LetterType) {
  const {
    data: letters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LETTERS_QUERY_KEY, type],
    queryFn: () => withVerify(() => getLetters(type)),
    select: (res) => res.data.information,
  });
  return { letters, isLoading, isError };
}
