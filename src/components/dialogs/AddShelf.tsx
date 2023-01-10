import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography
} from '@mui/material';
import { addDoc } from 'firebase/firestore';
import { ReactNode, useState } from 'react';

import useField from '../../hooks/useField';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { shelvesCollection } from '../../utils/firebase';

type Props = {
	children: (open: () => void) => ReactNode;
};

const AddShelf = ({ children }: Props) => {
	const user = useLoggedInUser();

	const [open, setOpen] = useState(false);
	const [description, _, descriptionProps] = useField('description');

	const [submitError, setSubmitError] = useState<string>();

	const closeDialog = () => {
		setOpen(false);
		descriptionProps.onChange({ target: { value: '' } } as never);
		setSubmitError(undefined);
	};

	const handleSubmit = async () => {
		if (!user?.email) {
			setSubmitError('Chyba');
			return;
		}

		try {
			await addDoc(shelvesCollection, {
				email: user.email,
				title: description
			});
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'Neznáma chyba');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog
				sx={{
					color: '#604D53'
				}}
				open={open}
				onClose={closeDialog}
			>
				<DialogTitle>Pridať poličku</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<TextField
						sx={{
							'width': '100%',
							'margin': '0 auto',
							'& .MuiOutlinedInput-root': {
								'& fieldset': {
									borderRadius: '12px',
									border: '2px solid #604D53'
								}
							}
						}}
						label="Názov"
						fullWidth
						{...descriptionProps}
					/>
				</DialogContent>
				<DialogActions>
					<Box
						sx={{
							display: 'flex',
							width: '100%',
							padding: '20px 24px',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}
					>
						{submitError && (
							<Typography
								variant="subtitle2"
								align="left"
								color="error"
								paragraph
							>
								{submitError}
							</Typography>
						)}
						<Button
							sx={{
								color: '#604D53',
								width: '80px',
								borderRadius: '12px',
								border: '2px solid #604D53',
								textTransform: 'none'
							}}
							onClick={closeDialog}
						>
							Zrušiť
						</Button>
						<Button
							sx={{
								color: 'white',
								backgroundColor: '#604D53',
								width: '80px',
								borderRadius: '12px',
								border: '2px solid #604D53',
								textTransform: 'none'
							}}
							onClick={handleSubmit}
							variant="contained"
						>
							Uložiť
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddShelf;
