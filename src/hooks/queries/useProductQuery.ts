import { useQuery } from '@tanstack/react-query';
import { fetchProduct } from '../../api/products';

const staleTime = 1000;

const useProductQuery = (id: string | undefined) => {
  const query = useQuery({
    queryKey: ['@ProductInfo', id],
    queryFn: () => fetchProduct(id),
    staleTime,
  });

  return { productInfo: query.data };
};

export default useProductQuery;
