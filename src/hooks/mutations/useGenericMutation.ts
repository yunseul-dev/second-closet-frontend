import { useQueryClient, useMutation } from '@tanstack/react-query';

interface UseGenericMutationOptions<TData, TVariables> {
  queryKey: string[];
  mutationFn: (variables: TVariables) => Promise<TData>;
  onMutate?: (variables: TVariables) => unknown;
}

const useGenericMutation = <TData, TVariables>({
  queryKey,
  mutationFn,
  onMutate,
}: UseGenericMutationOptions<TData, TVariables>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    async onMutate(variables: TVariables) {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousData = queryClient.getQueryData<TData>(queryKey);

      if (onMutate) {
        queryClient.setQueryData<TData>(queryKey, onMutate(variables) as TData);
      }

      return { previousData };
    },

    onError() {
      queryClient.setQueryData(queryKey, onMutate);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });
};

export default useGenericMutation;
