import { useQuery } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atom/userState';
import axios from 'axios';

const fetchProduct = async (id: string) => {
  const { data } = await axios.get(`/api/products/${id}`);
  return data;
};

const staleTime = 1000;

const useProductQuery = (id: string, options: object) => {
  const userId = useRecoilValue(userState);

  const query = useQuery({
    queryKey: ['@ProductInfo', userId],
    queryFn: () => fetchProduct(id),
    staleTime,
    ...options,
  });

  return { ...query, productInfo: query.data[0] };
};

export default useProductQuery;
