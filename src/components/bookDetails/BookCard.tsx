import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

import { Book } from '../../utils/firebase';
import FavoriteButton from '../buttons/FavoriteButton';
import ProgressButton from '../buttons/ProgressButton';

const BookCard = (book: Book) => {
	const navigate = useNavigate();

	const redirectToBookDetail = (book: Book) => {
		navigate(`/book-detail?title=${book.title}`);
	};

	return (
		<Box sx={{ textAlign: 'center', width: '80%', height: '80%' }}>
			<Button onClick={() => redirectToBookDetail(book)}>
				<img
					style={{
						maxHeight: 225,
						maxWidth: 225,
						width: 'auto',
						height: 'auto'
					}}
					src={book.thumbnail}
					alt={book.title}
					onError={e =>
						(e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no_thumbnail.jpg`)
					}
				/>
			</Button>
			<Box>
				<FavoriteButton {...book} />
				<ProgressButton {...book} />
				<Typography variant="subtitle2" gutterBottom component="div">
					{book.title}
				</Typography>
			</Box>
		</Box>
	);
};

export default BookCard;
