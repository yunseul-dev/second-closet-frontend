import useGenericMutation from './useGenericMutation';
import axios from 'axios';

const deleteSold = async (productId: number) => {
  axios.patch(`/api/products/update/${productId}`, { sold: false });
};

const useDeleteSoldMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: deleteSold,
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
