import { useGenericMutation } from '.';
import axios from 'axios';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

const addHeart = async ({ productId, userId }: { productId: number; userId: string }) => {
  axios.patch(`/api/products/hearts/${productId}/${userId}`);
};

const useAddHeartMutation = (id: string, hearts: string[]) => {
  const userId = useRecoilValue(userState)?.replace(/"/g, '') || '';

  return useGenericMutation({
    queryKey: ['@ProductInfo', id],
    mutationFn: addHeart,
    onMutate() {
      return (productInfo: object[]) => [{ ...productInfo[0], hearts: [...hearts, userId] }];
    },
  });
};

export default useAddHeartMutation;
