import { GetLettersReqParams, LetterType, LettersResponse, getLetters } from '@/apis/getLetters';
import { useInfiniteQuery, useQuery } from 'react-query';
import { withVerify } from '@/apis/withVerify';

// 우체통
export const LETTERS_QUERY_KEY = 'lettersQuery';
export default function useLettersQuery(params: GetLettersReqParams) {
  const {
    data: lettersInfiniteData,
    isLoading,
    isError,
    fetchNextPage: getNextLetters,
    isSuccess: getLettersIsSuccess,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [LETTERS_QUERY_KEY, params],
    queryFn: ({ pageParam = 0 }) => withVerify(() => getLetters({ ...params, page: pageParam })),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.information.last) {
        return undefined;
      }
      return lastPage.data.information.pageable.pageNumber + 1;
    },
  });
  const letters = lettersInfiniteData?.pages.map((letter) => letter.data.information.content).flat();
  return { letters, isLoading, isError, getNextLetters, getLettersIsSuccess, hasNextPage };
}
