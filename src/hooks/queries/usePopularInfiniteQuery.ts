import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPopulars } from '../../api/products';

interface Product {
  productId: string;
  productName: string;
  imgs: string;
  heartsCount: number;
  price: string;
}
interface FetchResponse {
  pages: Product[][];
  pageParams: number[];
}

const usePopularInfiniteQuery = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Product[], unknown, FetchResponse>({
    queryKey: ['@populars'],
    queryFn: async ({ pageParam = 0 }) => fetchPopulars(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Product[], hasNextPage, fetchNextPage };
};

export default usePopularInfiniteQuery;
