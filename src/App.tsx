import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Profiles } from 'pages/dashboard/profiles/profiles';
import { Profile } from 'pages/dashboard/profile/profile';
import { Suspense, lazy } from 'react';
import { CircularProgress } from '@mui/material';
import './index.css';

const DashboardPage = lazy(() => import('./pages/dashboard/dashboard'));

const router = createBrowserRouter([
  { path: '/', element: <Navigate replace to="/dashboard/profiles" /> },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <DashboardPage />
      </Suspense>
    ),
    children: [
      { path: 'profiles', element: <Profiles />, index: true },
      { path: 'profiles/:id', element: <Profile /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
