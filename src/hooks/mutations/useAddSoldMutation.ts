import { useGenericMutation } from '.';
import axios from 'axios';

const addSold = async (productId: number) => {
  axios.patch(`/api/products/update/${productId}`, { sold: true });
};

const useAddSoldMutation = (sortOption: string, productId: number) => {
  return useGenericMutation({
    queryKey: ['@MyProducts', sortOption],
    mutationFn: addSold,
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
