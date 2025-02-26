import { path } from 'shared/lib/router';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { ErrorPage } from 'pages/error';
import { MainPage } from 'pages/main';
import { StartPage } from 'pages/start';
import { AdminPage } from 'pages/admin';
import { ProtectedRoute } from './router.hocs';
import { RegistrationPage } from 'pages/registration';

export const routerConfig = createBrowserRouter([
	{
		path: path.home(),
		element: <MainLayout />,
		errorElement: (
			<MainLayout>
				<ErrorPage />
			</MainLayout>
		),
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: path.admin(),
				element: <ProtectedRoute element={<AdminPage />} />,
			},
			{
				path: path.start(),
				element: <StartPage />,
			},
			{
				path: path.registration(),
				element: <RegistrationPage />,
			},
		],
	},
]);
