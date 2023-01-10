import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import formStyles from '../styles/formStyles';
import useField from '../hooks/useField';
import { signIn } from '../utils/firebase';
import FormTextField from '../components/FormTextField';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
	usePageTitle('Login');
	const navigate = useNavigate();

	const [email, _email, usernameProps] = useField('email', true);
	const [password, _password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Box
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					await signIn(email, password);
					navigate('/');
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Neznáma chyba!'
					);
				}
			}}
			sx={{
				backgroundColor: '#084C61',
				...formStyles.pageBackground
			}}
		>
			<Box>
				<Typography
					variant="h4"
					component="h2"
					sx={{ ...formStyles.formTitle }}
				>
					Prihlásenie
				</Typography>
				<Paper
					sx={{
						...formStyles.form
					}}
				>
					<FormTextField label="E-mail" {...usernameProps} type="email" />
					<FormTextField label="Heslo" {...passwordProps} type="password" />
					<Box
						sx={{
							...formStyles.buttonsBlock
						}}
					>
						{submitError && (
							<Typography
								variant="inherit"
								textAlign="right"
								sx={{ color: 'error.main' }}
							>
								{submitError}
							</Typography>
						)}
						<Button
							variant="outlined"
							sx={{
								...formStyles.button
							}}
							onClick={() => navigate('/')}
						>
							Zrušiť
						</Button>
						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: '#084C61',
								...formStyles.button
							}}
						>
							Prihlásiť
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

export default Login;
