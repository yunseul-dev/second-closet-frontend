import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPopulars } from '../../api/products';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
}

interface FetchResponse {
  pages: Product[][];
  pageParams: number[];
}

const usePopularInfiniteQuery = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse, Product[], unknown>({
    queryKey: ['@populars'],
    queryFn: async ({ pageParam = 0 }) => fetchPopulars(pageParam),
    getNextPageParam: (lastPage: FetchResponse['pages'][0], allPages: FetchResponse['pageParams']) => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { data, hasNextPage, fetchNextPage };
};

export default usePopularInfiniteQuery;
