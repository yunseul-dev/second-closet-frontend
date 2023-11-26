import { useGenericMutation } from '.';
import axios from 'axios';

const deleteHeart = async ({ productId, userId }: { productId: number; userId: string }) => {
  axios.delete(`/api/products/hearts/${productId}/${userId}`);
};

const useDeleteHeartMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyHearts', sortOption],
    mutationFn: deleteHeart,
    onMutate() {
      return products => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteHeartMutation;
