import { LetterType, LettersResponse, getLetters } from '@/apis/getLetters';
import { useQuery } from 'react-query';
import useApiError from '../custom/useApiError';
import { withVerify } from '@/apis/withVerify';
import { authToken } from '@/class/authToken';

export const LETTERS_QUERY_KEY = 'lettersQuery';
export default function useLettersQuery(type: LetterType) {
  const accessToken = authToken.getToken();
  const {
    data: letters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [LETTERS_QUERY_KEY, type],
    queryFn: () => withVerify(() => getLetters(type, accessToken)),
    select: (res) => res.data.information,
  });
  return { letters, isLoading, isError };
}
