import axios from 'axios';
import { useGenericMutation } from '.';

const deleteProduct = async (productId: number) => await axios.delete(`/api/products/delete/${productId}`);

const useDeleteProductMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: deleteProduct,
    onMutate() {
      return products => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteProductMutation;
