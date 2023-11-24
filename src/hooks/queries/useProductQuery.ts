import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProduct = async (id: string) => {
  const res = await axios.get(`/api/products/${id}`);
  return res.data;
};

const staleTime = 1000;

const useProductQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['@ProductInfo', id],
    queryFn: () => fetchProduct(id),
    staleTime,
  });

  return { productInfo: query.data[0] };
};

export default useProductQuery;
