import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';
import { deleteHeart } from '../../api/products';

const useDeleteHeartMutation = (id: string, hearts: string[]) => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@ProductInfo', id + ''],
    mutationFn: () => deleteHeart(id, userId),
    onMutate() {
      return (productInfo: object[]) =>
        [{ ...productInfo, hearts: hearts.filter((user: string) => user !== userId) }][0];
    },
  });
};

export default useDeleteHeartMutation;
