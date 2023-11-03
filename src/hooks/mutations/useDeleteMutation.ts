import useGenericMutation from './useGenericMutation';
import axios from 'axios';
import { userState } from '../../recoil/atom/userState';
import { useRecoilValue } from 'recoil';

const deleteHeart = async ({ productId, userId }: { productId: number; userId: string; hearts: string[] }) => {
  axios.delete(`/api/products/hearts/${productId}/${userId}`);
};

const useDeleteHeartMutation = () => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@ProductInfo', userId],
    mutationFn: deleteHeart,
    onMutate() {
      return (productInfo: object[]) => [
        {
          ...productInfo[0],
          hearts: [...productInfo[0].hearts.filter((id: string) => id !== userId)],
        },
      ];
    },
    suspense: true,
  });
};

export default useDeleteHeartMutation;
