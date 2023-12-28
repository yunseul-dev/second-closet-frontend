import { useGenericMutation } from '.';
import { deleteProduct } from '../../api/products';

interface Product {
  productId: number;
}

interface Products {
  pages: Product[][];
}

const useDeleteProductMutation = (sortOption: string, productId: number) => {
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
