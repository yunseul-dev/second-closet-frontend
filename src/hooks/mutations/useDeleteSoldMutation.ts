import { useGenericMutation } from '.';
import { deleteSold } from '../../api/products';

const useDeleteSoldMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: () => deleteSold(productId),
    onMutate() {
      return products => ({
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
