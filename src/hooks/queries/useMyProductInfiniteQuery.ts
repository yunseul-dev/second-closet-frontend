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
  pages: Product[][];
  pageParams: number[];
}

const useMyProductInfiiteQuery = (userId: string, sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse, Product[], unknown>({
    queryKey: ['@MyProducts', sortOption],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get(`/api/products/myproducts?sort=${sortOption}`, {
        params: {
          userId: userId,
          page: pageParam,
        },
      });

      return res.data;
    },
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { products: data, hasNextPage, fetchNextPage };
};

export default useMyProductInfiiteQuery;
