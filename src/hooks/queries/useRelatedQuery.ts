import { useQuery } from '@tanstack/react-query';
import { fetchRelated } from '../../api/products';

const useRelatedQuery = (productId: string, category: string) => {
  const { data } = useQuery({
    queryKey: ['@RelatedProduct', productId],
    queryFn: async () => fetchRelated(productId, category),
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return data;
};

export default useRelatedQuery;
