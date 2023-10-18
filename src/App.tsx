import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import routerConfig from './router/routerConfig';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routerConfig} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
