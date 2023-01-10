import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Typography,
	Button,
	Box
} from '@mui/material';
import { ReactNode, useState } from 'react';

import useField from '../../hooks/useField';
import useLoggedInUser from '../../hooks/useLoggedInUser';
import { Book, updateBooksProgress } from '../../utils/firebase';

type Props = {
	children: (open: () => void) => ReactNode;
	book: Book;
};

const ChangeProgress = ({ children, book }: Props) => {
	const user = useLoggedInUser();

	const [open, setOpen] = useState(false);
	const [progress, setProgress, progressProps] = useField('description');

	const [submitError, setSubmitError] = useState<string>();

	const closeDialog = () => {
		setOpen(false);
		setProgress('');
		setSubmitError(undefined);
	};

	const handleSubmit = async () => {
		if (!user?.email) {
			setSubmitError('Chyba');
			return;
		}

		const progressNumber = Number(progress);
		if (
			progressNumber < 0 ||
			(book.pageCount && progressNumber > book.pageCount)
		) {
			setSubmitError(
				`Môžeš byť iba na strane väčšej ako 0 a menší než celkový počet, čo je ${book.pageCount}`
			);
			return;
		}

		try {
			updateBooksProgress(book, progressNumber);
			closeDialog();
		} catch (err) {
			setSubmitError((err as { message?: string })?.message ?? 'Neznáma chyba');
		}
	};

	return (
		<>
			{children(() => setOpen(true))}
			<Dialog sx={{ color: '#084C61' }} open={open} onClose={closeDialog}>
				<DialogTitle variant="subtitle1">
					V knihe {book.title} se nachádzam na:
				</DialogTitle>
				<DialogContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center'
					}}
				>
					<TextField
						type="number"
						label="progress"
						fullWidth
						defaultValue={book.pageCurrent}
						{...progressProps}
					/>
					<Typography sx={{ color: '#084C61' }}>
						{' '}
						strane z {book.pageCount}
					</Typography>
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
								color: '#084C61',
								width: '120px',
								borderRadius: '12px',
								border: '2px solid #084C61',
								textTransform: 'none'
							}}
							onClick={closeDialog}
						>
							Zrušiť
						</Button>
						<Button
							sx={{
								color: 'white',
								backgroundColor: '#084C61',
								width: '120px',
								borderRadius: '12px',
								border: '2px solid #084C61',
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

export default ChangeProgress;
