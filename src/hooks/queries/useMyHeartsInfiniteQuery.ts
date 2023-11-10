import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: string;
}

interface FetchResponse {
  pages: Product[];
  pageParams: number[];
}

const useMyHeartsInfiniteQuery = (userId: string, sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse[], Product[], unknown>({
    queryKey: ['@MyHearts', sortOption],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await axios.get(`/api/products/myhearts?sort=${sortOption}`, {
        params: {
          userId: userId,
          page: pageParam,
        },
      });

      return data;
    },
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { products: data, hasNextPage, fetchNextPage };
};

export default useMyHeartsInfiniteQuery;
