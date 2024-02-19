import { useGenericMutation } from '.';
import { deleteHeart } from '../../api/products';

interface Product {
  productId: string;
}

interface Products {
  pages: Product[][];
}

const useDeleteMyHeartMutation = (sortOption: string, productId: string) => {
  return useGenericMutation({
    queryKey: ['@MyHearts', sortOption],
    mutationFn: () => deleteHeart(productId),
    onMutate() {
      return (products: Products) => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteMyHeartMutation;
