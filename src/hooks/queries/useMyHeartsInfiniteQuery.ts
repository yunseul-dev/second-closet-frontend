import { useInfiniteQuery } from '@tanstack/react-query';
import { myHeartsInfinite } from '../../api/products';

interface Product {
  productId: string;
  sellerId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  discount: boolean;
  hearts: string[];
  createdAt: string;
  sold: boolean;
}

interface FetchResponse {
  pages: Product[];
  pageParams: number[];
}

const useMyHeartsInfiniteQuery = (sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Product[], unknown, FetchResponse>({
    queryKey: ['@MyHearts', sortOption],
    queryFn: async ({ pageParam = 0 }) => myHeartsInfinite(sortOption, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Product[], hasNextPage, fetchNextPage };
};

export default useMyHeartsInfiniteQuery;
