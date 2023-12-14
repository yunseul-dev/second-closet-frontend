import { useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom';
import { myHeartsInfinite } from '../../api/products';

interface Product {
  productId: number;
  sellerId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  discount: boolean;
  hearts: string[];
  createdAt: number;
  sold: boolean;
}

interface FetchResponse {
  pages: Product[];
  pageParams: number[];
}

const useMyHeartsInfiniteQuery = (sortOption: string) => {
  const userId = useRecoilValue(userState);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse[], Product[], unknown>({
    queryKey: ['@MyHearts', sortOption],
    queryFn: async ({ pageParam = 0 }) => myHeartsInfinite(sortOption, userId, pageParam),
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { products: data, hasNextPage, fetchNextPage };
};

export default useMyHeartsInfiniteQuery;
