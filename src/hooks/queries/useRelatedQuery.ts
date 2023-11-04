import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useRelatedQuery = (productId: number, category: string) => {
  const { data } = useQuery({
    queryKey: ['@RelatedProduct', productId],
    queryFn: async () => {
      const res = await axios.get(`/api/products/related/${productId}/${category}`);

      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return data;
};

export default useRelatedQuery;
