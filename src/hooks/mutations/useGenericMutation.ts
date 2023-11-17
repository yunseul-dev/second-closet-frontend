import { useQueryClient, useMutation, MutationFunction } from '@tanstack/react-query';

interface UseGenericMutationOptions<TData, TVariables> {
  queryKey: string[];
  mutationFn: MutationFunction<TData, TVariables>;
  onMutate?: (variables: TVariables) => unknown;
}

const useGenericMutation = <TData, TVariables>({
  queryKey,
  mutationFn,
  onMutate: expected,
}: UseGenericMutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,

    async onMutate(variables: TVariables) {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, expected(variables));

      return { previousData };
    },

    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousData);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export default useGenericMutation;
