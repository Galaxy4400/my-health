import { path } from 'shared/lib/router';
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts';
import { ProtectedRoute } from './router.hocs';
import { ErrorPage } from 'pages/error';
import { MainPage } from 'pages/main';
import { StartPage } from 'pages/start';
import { AdminPage } from 'pages/admin';
import { PatientDataPage } from 'pages/patient-data';
import { MeasurePage } from 'pages/measure';
import { CardioPage } from 'pages/cardio';
import { BodyPage } from 'pages/body';
import { FinishPage } from 'pages/finish';
import { ResultsPage } from 'pages/results';
import { PulsPage } from 'pages/puls';
import { ExaminationPage } from 'pages/examination';

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
				path: path.patientData(),
				element: <PatientDataPage />,
			},
			{
				path: path.measure(),
				element: <MeasurePage />,
			},
			{
				path: path.puls(),
				element: <PulsPage />,
			},
			{
				path: path.cardio(),
				element: <CardioPage />,
			},
			{
				path: path.body(),
				element: <BodyPage />,
			},
			{
				path: path.examination(),
				element: <ExaminationPage />,
			},
			{
				path: path.finish(),
				element: <FinishPage />,
			},
			{
				path: path.results(),
				element: <ResultsPage />,
			},
		],
	},
]);
