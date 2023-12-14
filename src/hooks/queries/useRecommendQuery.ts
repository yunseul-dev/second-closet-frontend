import { useQuery } from '@tanstack/react-query';
import { fetchRecommend } from '../../api/products';

const useRecommendQuery = () => {
  const { data } = useQuery({
    queryKey: ['@RecommendProduct'],
    queryFn: async () => fetchRecommend(),
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return data;
};

export default useRecommendQuery;
