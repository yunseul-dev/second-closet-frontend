import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import AuthForm from '../components/auth/AuthForm';
import DetailPage from '../pages/DetailPage';
import CreatePostPage from '../pages/CreatePostPage';
import AuthenticationGuard from '../guard/AuthenticationGuard';
import { Suspense } from 'react';
import CategoryItemsPage from '../pages/CategoryItemsPage';
import MyPage from '../pages/MyPage';
import EditPostPage from '../pages/EditPostPage';
import Loading from '../components/skeletons/Loading';
import BuyPage from '../pages/BuyPage';

const routerConfig = createBrowserRouter([
  {
    path: '/signin',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthForm />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Root />
      </Suspense>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <DetailPage />
      </Suspense>
    ),
  },
  {
    path: '/category/:param1/:param2?/:param3?',
    element: (
      <Suspense fallback={<Loading />}>
        <CategoryItemsPage />
      </Suspense>
    ),
  },

  {
    path: '/createpost',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationGuard redirectTo="/signin" element={<CreatePostPage />} />
      </Suspense>
    ),
  },
  {
    path: '/mypage',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationGuard redirectTo="/signin" element={<MyPage />} />
      </Suspense>
    ),
  },
  {
    path: '/editpost/:id',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationGuard redirectTo="/signin" element={<EditPostPage />} />
      </Suspense>
    ),
  },
  {
    path: '/chatpage/:id?',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthenticationGuard redirectTo="/signin" element={<BuyPage />} />
      </Suspense>
    ),
  },
]);

export default routerConfig;
