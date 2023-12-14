import { useRecoilValue } from 'recoil';
import { useGenericMutation } from '.';
import { deleteHeart } from '../../api/products';
import { userState } from '../../recoil/atom';

const useDeleteMyHeartMutation = (sortOption: string, productId: number) => {
  const userId = useRecoilValue(userState);
  return useGenericMutation({
    queryKey: ['@MyHearts', sortOption],
    mutationFn: () => deleteHeart(productId, userId),
    onMutate() {
      return products => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteMyHeartMutation;
