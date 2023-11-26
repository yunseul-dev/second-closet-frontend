import { createBrowserRouter } from 'react-router-dom';
import AuthenticationGuard from '../guard/AuthenticationGuard';
import { Suspense } from 'react';
import Loading from '../components/skeletons/Loading';

import {
  ChatPage,
  EditPostPage,
  MyPage,
  CategoryItemsPage,
  CreatePostPage,
  DetailPage,
  Root,
  AuthPage,
} from '../pages';

const routerConfig = createBrowserRouter([
  {
    path: '/signin',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthPage />
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
        <AuthenticationGuard redirectTo="/signin" element={<ChatPage />} />
      </Suspense>
    ),
  },
]);

export default routerConfig;
