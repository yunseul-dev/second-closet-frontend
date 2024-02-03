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
    path: '/detail/:id',
    element: lazyLoading('DetailPage'),
  },
  {
    path: '/category/:param1/:param2?/:param3?',
    element: lazyLoading('CategoryItemsPage'),
  },
  {
    path: '/tag/:tagname',
    element: lazyLoading('TagsPage'),
  },

  {
    path: '/createpost',
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
    path: '/editpost/:id',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('EditPostPage')} />,
  },
  {
    path: '/chatpage/:id?',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('ChatPage')} />,
  },
  {
    path: '/buypage',
    element: <AuthenticationGuard redirectTo="/signin" element={lazyLoading('BuyPage')} />,
  },
]);

export default routerConfig;
