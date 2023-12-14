import { useGenericMutation } from '.';
import { addSold } from '../../api/products';

const useAddSoldMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => addSold(productId),
    onMutate() {
      return products => ({
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
