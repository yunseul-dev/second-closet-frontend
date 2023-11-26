import { useGenericMutation } from '.';
import axios from 'axios';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

const addHeart = async ({ productId, userId }: { productId: number; userId: string; hearts: string[] }) => {
  axios.patch(`/api/products/hearts/${productId}/${userId}`);
};

const useAddHeartMutation = () => {
  const userId = useRecoilValue(userState) || '';

  return useGenericMutation({
    queryKey: ['@ProductInfo', userId],
    mutationFn: addHeart,
    onMutate() {
      return (productInfo: object[]) => [{ ...productInfo[0], hearts: [...productInfo[0].hearts, userId] }];
    },
  });
};

export default useAddHeartMutation;
