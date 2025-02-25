import { useNavigate } from 'react-router-dom';

export const ErrorHandler = ({ message }: { message: string }) => {
	const navigate = useNavigate();

	return (
		<>
			<p>{message}</p>
			<button type="button" onClick={() => navigate(-1)}>
				Вернуться
			</button>
		</>
	);
};
