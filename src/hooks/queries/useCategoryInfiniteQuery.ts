import { useInfiniteQuery } from '@tanstack/react-query';
import { categoryInfinite } from '../../api/products';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  price: string;
  createdAt: number;
}

interface FetchResponse {
  pages: Product[][];
  pageParams: number[];
}

const useCategoryInfiniteQuery = (category: string[], sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Product[], unknown, FetchResponse>({
    queryKey: ['@CategoryItem', category, sortOption],
    queryFn: ({ pageParam = 0 }) => categoryInfinite(sortOption, category, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Product[], hasNextPage, fetchNextPage };
};

export default useCategoryInfiniteQuery;
