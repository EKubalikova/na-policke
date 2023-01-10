import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Book } from '../../utils/firebase';
import AddNote from '../dialogs/AddNote';
import FavoriteButton from '../buttons/FavoriteButton';
import ProgressBar from '../Progress';
import ProgressButton from '../buttons/ProgressButton';

const BookCardInProgress = (book: Book) => {
	const navigate = useNavigate();

	return (
		<Card
			sx={{
				width: 800,
				height: 250,
				border: '2px solid white',
				borderRadius: '10px',
				backgroundColor: 'rgba(255, 255, 255, 0.3)',
				display: 'flex',
				alignItems: 'center',
				margin: '0.5rem',
				color: 'white'
			}}
		>
			<Grid container>
				<Grid
					item
					xs={3}
					onClick={() => navigate(`/book-detail?title=${book.title}`)}
					sx={{ display: 'flex', alignItems: 'center' }}
				>
					<img
						style={{
							display: 'block',
							maxHeight: 215,
							maxWidth: 165,
							height: 'auto',
							width: 'auto',
							margin: '0 auto'
						}}
						src={book.thumbnail}
						alt={book.title}
						onError={e =>
							(e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no_thumbnail.jpg`)
						}
					/>
				</Grid>
				<Grid item xs={6}>
					<CardContent>
						<Typography gutterBottom variant="h6" component="h2">
							{book.title}
						</Typography>
						<Typography variant="body2" component="p">
							{book.author}
						</Typography>
						<AddNote title={book?.title}>
							{open => (
								<Button
									variant="outlined"
									sx={{
										color: 'white',
										backgroundColor: 'rgba(255, 255, 255, 0.35)',
										marginTop: '2rem',
										borderRadius: '12px',
										border: '2px solid white',
										height: '30px',
										textTransform: 'none'
									}}
									onClick={open}
								>
									Pridať poznámku
								</Button>
							)}
						</AddNote>
					</CardContent>
				</Grid>
				<Grid item xs={3} sx={{ position: 'relative' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							marginRight: '1rem'
						}}
					>
						<FavoriteButton {...book} />
					</Box>
					<Grid container sx={{ alignItems: 'center', marginTop: '10rem' }}>
						<Grid item xs={2}>
							<ProgressButton {...book} />
						</Grid>
						<Grid item xs={1} />
						<Grid item xs={8}>
							<ProgressBar
								{...{
									pageCount: book.pageCount,
									pageCurrent: book.pageCurrent
								}}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);
};

export default BookCardInProgress;
