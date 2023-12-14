import { useInfiniteQuery } from '@tanstack/react-query';
import { tagsInfinite } from '../../api/products';

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

const useTagsInfiniteQuery = (tag: string, sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<FetchResponse, Product[], unknown>({
    queryKey: ['@TagItem', tag, sortOption],
    queryFn: async ({ pageParam = 0 }) => tagsInfinite(tag, sortOption, pageParam),
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
    select: response => response.pages.flat(),
  });

  return { data, hasNextPage, fetchNextPage };
};

export default useTagsInfiniteQuery;
