import { path } from 'shared/lib/router';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { ErrorPage } from 'pages/error';
import { MainPage } from 'pages/main';
import { StartPage } from 'pages/start';
import { Step1Page } from 'pages/step1';

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
				path: path.start(),
				element: <StartPage />,
			},
			{
				path: path.step1(),
				element: <Step1Page />,
			},
		],
	},
]);
