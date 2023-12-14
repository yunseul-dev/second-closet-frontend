import { useGenericMutation } from '.';
import { userState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';
import { deleteHeart } from '../../api/products';

const useDeleteHeartMutation = (id: number, hearts: string[]) => {
  const userId = useRecoilValue(userState);

  return useGenericMutation({
    queryKey: ['@ProductInfo', id + ''],
    mutationFn: () => deleteHeart(id, userId),
    onMutate() {
      return (productInfo: object[]) => [
        { ...productInfo[0], hearts: hearts.filter((user: string) => user !== userId) },
      ];
    },
  });
};

export default useDeleteHeartMutation;
