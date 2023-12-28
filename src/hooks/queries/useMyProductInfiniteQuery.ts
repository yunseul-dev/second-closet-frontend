import { useInfiniteQuery } from '@tanstack/react-query';
import { myProductsInfinite } from '../../api/products';

interface Products {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: number;
  createdAt: number;
  sold: boolean;
}

interface FetchResponse {
  pages: Products[][];
  pageParams: number[];
}

const useMyProductInfiiteQuery = (userId: string, sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Products[], unknown, FetchResponse>({
    queryKey: ['@MyProducts', sortOption],
    queryFn: async ({ pageParam = 0 }) => myProductsInfinite(sortOption, userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Products[], allPages: Products[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Products[], hasNextPage, fetchNextPage };
};

export default useMyProductInfiiteQuery;
