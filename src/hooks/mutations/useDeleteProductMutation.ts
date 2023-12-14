import { useGenericMutation } from '.';
import { deleteProduct } from '../../api/products';

const useDeleteProductMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => deleteProduct(productId),
    onMutate() {
      return products => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteProductMutation;
