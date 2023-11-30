import { useGenericMutation } from '.';
import axios from 'axios';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

const deleteHeart = async ({ productId, userId }: { productId: number; userId: string }) => {
  axios.delete(`/api/products/hearts/${productId}/${userId}`);
};

const useDeleteHeartMutation = (id: string, hearts: string[]) => {
  const userId = useRecoilValue(userState)?.replace(/"/g, '') || '';

  return useGenericMutation({
    queryKey: ['@ProductInfo', id],
    mutationFn: deleteHeart,
    onMutate() {
      return (productInfo: object[]) => [
        { ...productInfo[0], hearts: hearts.filter((user: string) => user !== userId) },
      ];
    },
  });
};

export default useDeleteHeartMutation;
