import { LetterType, getLetters } from '@/apis/getLetters';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';

export const LETTERS_QUERY_KEY = 'lettersQuery';
export default function useLettersQuery(type: LetterType, accessToken: string) {
  const { handlerError } = useApiError({ 402: () => console.log('ㅇㅇ') });
  const {
    data: letters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LETTERS_QUERY_KEY],
    queryFn: () => getLetters(type, accessToken),
    select: (res) => res.data.information,
    onError: handlerError,
  });
  return { letters, isLoading, isError };
}