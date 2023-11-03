import { useQueryClient, useMutation, MutationFunction } from '@tanstack/react-query';

interface UseGenericMutationOptions<TData, TVariables> {
  queryKey: string[];
  mutationFn: MutationFunction<TData, TVariables>;
  onMutate: (variables: TVariables) => TData;
}

const useGenericMutation = <TData, TVariables>({
  queryKey,
  mutationFn,
  onMutate: expected,
}: UseGenericMutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey,
    mutationFn,

    async onMutate(variables: TVariables) {
      await queryClient.cancelQueries({ queryKey });
      const previousHearts = queryClient.getQueryData<TData>(queryKey);

      queryClient.setQueryData<TData>(queryKey, expected(variables));
      const nowHearts = queryClient.getQueryData<TData>(queryKey);

      return { previousHearts };
    },

    onError(err, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousHearts);
    },

    onSettled() {},
  });
};

export default useGenericMutation;
