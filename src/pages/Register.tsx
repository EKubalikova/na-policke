import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import FormTextField from '../components/FormTextField';
import useField from '../hooks/useField';
import usePageTitle from '../hooks/usePageTitle';
import formStyles from '../styles/formStyles';
import { signUp } from '../utils/firebase';

const Register = () => {
	usePageTitle('Register');

	const navigate = useNavigate();

	const [name, _name, nameProps] = useField('name', true);
	const [surname, _surname, surnameProps] = useField('surname', true);
	const [email, _email, emailProps] = useField('email', true);
	const [password, _password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Box
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					await signUp(name, surname, email, password);
					navigate('/');
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Neznáma chyba!'
					);
				}
			}}
			sx={{
				backgroundColor: '#604D53',
				...formStyles.pageBackground
			}}
		>
			<Box>
				<Typography
					variant="h4"
					component="h2"
					sx={{ ...formStyles.formTitle }}
				>
					Registrácia
				</Typography>
				<Paper
					sx={{
						...formStyles.form
					}}
				>
					<FormTextField label="Meno" {...nameProps} type="text" />
					<FormTextField label="Priezvisko" {...surnameProps} type="text" />
					<FormTextField label="E-mail" {...emailProps} type="email" />
					<FormTextField label="Heslo" {...passwordProps} type="password" />
					<Box
						sx={{
							...formStyles.buttonsBlock
						}}
					>
						{submitError && (
							<Typography
								variant="caption"
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
								backgroundColor: '#604D53',
								...formStyles.button
							}}
						>
							Zaregistrovať
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

export default Register;
