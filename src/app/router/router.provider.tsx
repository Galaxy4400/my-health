import { RouterProvider } from 'react-router-dom';
import { routerConfig } from './router.config';

export const AppRouter = () => <RouterProvider router={routerConfig} />;
