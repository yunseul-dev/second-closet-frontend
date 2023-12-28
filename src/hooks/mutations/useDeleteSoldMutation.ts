import { useGenericMutation } from '.';
import { deleteSold } from '../../api/products';

interface Product {
  productId: number;
  sold: boolean;
}

interface Products {
  pages: Product[][];
}

const useDeleteSoldMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => deleteSold(productId),
    onMutate() {
      return (products: Products) => ({
        ...products,
        pages: products.pages.map(page =>
          page.map(product => {
            if (product.productId === productId) {
              return {
                ...product,
                sold: false,
              };
            }

            return product;
          }),
        ),
      });
    },
  });
};

export default useDeleteSoldMutation;
