import { useGenericMutation } from '.';
import { addSold } from '../../api/products';

interface Product {
  productId: string;
  sold: boolean;
}

interface Products {
  pages: Product[][];
}

const useAddSoldMutation = (sortOption: string, productId: string) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => addSold(productId),
    onMutate() {
      return (products: Products) => ({
        ...products,
        pages: products.pages.map(page =>
          page.map(product => {
            if (product.productId === productId) {
              return {
                ...product,
                sold: true,
              };
            }

            return product;
          }),
        ),
      });
    },
  });
};

export default useAddSoldMutation;
