import { createBrowserRouter } from 'react-router-dom';
import AuthenticationGuard from '../guard/AuthenticationGuard';
import { Suspense, lazy } from 'react';
import Loading from '../components/skeletons/Loading';

const lazyLoading = (component: string) => {
  const LazyElement = lazy(() => import(`../pages/${component}.tsx`));

  return (
    <Suspense fallback={<Loading />}>
      <LazyElement />
    </Suspense>
  );
};

const routerConfig = createBrowserRouter([
  {
    path: '/signin',
    element: lazyLoading('AuthPage'),
  },
  {
    path: '/',
    element: lazyLoading('Root'),
  },
  {
    path: '/product/:id',
    element: lazyLoading('DetailPage'),
  },
  {
    path: '/category/:categoryId/:subCategoryId?/:subCategory2Id?',
    element: lazyLoading('CategoryItemsPage'),
  },
  {
    path: '/tag',
    element: lazyLoading('TagsPage'),
  },
  {
    path: '/newproduct',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('CreatePostPage')} />,
  },
  {
    path: '/mypage',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('MyPage')} />,
  },
  {
    path: '/accounts',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('AccountsPage')} />,
  },
  {
    path: '/edit/:id',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('EditPostPage')} />,
  },
  {
    path: '/chat/:id?',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('ChatPage')} />,
  },
  {
    path: '/order',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('BuyPage')} />,
  },
]);

export default routerConfig;
