import { useGenericMutation } from '.';
import { deleteProduct } from '../../api/products';

interface Product {
  productId: string;
}

interface Products {
  pages: Product[][];
}

const useDeleteProductMutation = (sortOption: string, productId: string) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => deleteProduct(productId),
    onMutate() {
      return (products: Products) => ({
        ...products,
        pages: products.pages.map(page => page.filter(product => product.productId !== productId)),
      });
    },
  });
};

export default useDeleteProductMutation;
