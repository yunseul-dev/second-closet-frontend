import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';
import { addHeart } from '../../api/products';

const useAddHeartMutation = (id: number, hearts: string[]) => {
  const userId = useRecoilValue(userState) || '';

  return useGenericMutation({
    queryKey: ['@ProductInfo', id + ''],
    mutationFn: () => addHeart(id, userId),
    onMutate() {
      return (productInfo: object[]) => [{ ...productInfo[0], hearts: [...hearts, userId] }];
    },
  });
};

export default useAddHeartMutation;
