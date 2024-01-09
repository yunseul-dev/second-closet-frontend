import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';
import { addHeart } from '../../api/products';

const useAddHeartMutation = (id: string, hearts: string[]) => {
  const userId = useRecoilValue(userState) || '';

  return useGenericMutation({
    queryKey: ['@ProductInfo', id + ''],
    mutationFn: () => addHeart(id, userId),
    onMutate() {
      return (productInfo: object[]) => [{ ...productInfo, hearts: [...hearts, userId] }][0];
    },
  });
};

export default useAddHeartMutation;
