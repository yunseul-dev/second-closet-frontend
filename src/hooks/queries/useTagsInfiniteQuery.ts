import { useInfiniteQuery } from '@tanstack/react-query';
import { tagsInfinite } from '../../api/products';

interface Product {
  productId: string;
  productName: string;
  imgs: string;
  price: string;
  createdAt: string;
}

interface FetchResponse {
  pages: Product[][];
  pageParams: number[];
}

const useTagsInfiniteQuery = (tag: string | null, sortOption: string) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<Product[], unknown, FetchResponse>({
    queryKey: ['@TagItem', tag, sortOption],
    queryFn: async ({ pageParam = 0 }) => tagsInfinite(tag, sortOption, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Product[], allPages: Product[][]): number | undefined => {
      const nextPage = allPages.length === 1 ? 1 : allPages.length;

      return lastPage.length !== 0 ? nextPage : undefined;
    },
  });

  return { products: data?.pages.flat() as Product[], hasNextPage, fetchNextPage };
};

export default useTagsInfiniteQuery;
