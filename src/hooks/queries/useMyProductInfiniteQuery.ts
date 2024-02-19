import { useInfiniteQuery } from '@tanstack/react-query';
import { myProductsInfinite } from '../../api/products';

interface Products {
  productId: string;
  productName: string;
  imgs: string[];
  price: string;
  delivery: boolean;
  hearts: number;
  createdAt: string;
  sold: boolean;
}

interface FetchResponse {
  pages: Products[][];
  pageParams: number[];
}

const useMyProductInfiiteQuery = (sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Products[], unknown, FetchResponse>({
    queryKey: ['@MyProducts', sortOption],
    queryFn: async ({ pageParam = 0 }) => myProductsInfinite(sortOption, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Products[], allPages: Products[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Products[], hasNextPage, fetchNextPage };
};

export default useMyProductInfiiteQuery;
