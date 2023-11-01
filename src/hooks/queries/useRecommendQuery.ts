import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useRecommendQuery = () => {
  const { data } = useQuery({
    queryKey: ['@RecommendProduct'],
    queryFn: async () => {
      const res = await axios.get(`/api/products/recommend`);

      return res.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return data;
};

export default useRecommendQuery;
