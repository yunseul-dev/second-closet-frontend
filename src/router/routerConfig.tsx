import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import AuthForm from '../components/auth/AuthForm';
import DetailPage from '../pages/DetailPage';
import CreatePostPage from '../pages/CreatePostPage';
import AuthenticationGuard from '../guard/AuthenticationGuard';
import { Suspense } from 'react';

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
    path: '/createpost',
    element: (
      <Suspense fallback={<div>...loading</div>}>
        <AuthenticationGuard redirectTo="/signin" element={<CreatePostPage />} />
      </Suspense>
    ),
  },
]);

export default routerConfig;
