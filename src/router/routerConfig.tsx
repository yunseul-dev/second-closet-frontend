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

const routerConfig = createBrowserRouter([
  {
    path: '/signin',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <AuthForm />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <Root />
      </Suspense>
    ),
  },
  {
    path: '/detail/:id',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <DetailPage />
      </Suspense>
    ),
  },
  {
    path: '/category/:param1/:param2?/:param3?',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <CategoryItemsPage />
      </Suspense>
    ),
  },

  {
    path: '/createpost',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <AuthenticationGuard redirectTo="/signin" element={<CreatePostPage />} />
      </Suspense>
    ),
  },
  {
    path: '/mypage',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <AuthenticationGuard redirectTo="/signin" element={<MyPage />} />
      </Suspense>
    ),
  },
  {
    path: '/editpost',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <AuthenticationGuard redirectTo="/signin" element={<EditPostPage />} />
      </Suspense>
    ),
  },
]);

export default routerConfig;
