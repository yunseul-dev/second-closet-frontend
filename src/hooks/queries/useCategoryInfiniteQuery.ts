import { useInfiniteQuery } from '@tanstack/react-query';
import { categoryInfinite } from '../../api/products';

interface Product {
  productId: number;
  productName: string;
  imgs: string[];
  createdAt: string;
}

interface FetchResponse {
  pages: Product[][];
  pageParams: number[];
}

const useCategoryInfiniteQuery = (category: string[], sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse, Product[], unknown>({
    queryKey: ['@CategoryItem', category, sortOption],
    queryFn: ({ pageParam = 0 }) => categoryInfinite(sortOption, category, pageParam),
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { data, hasNextPage, fetchNextPage };
};

export default useCategoryInfiniteQuery;
