import { Box, Card, CardContent, Typography } from '@mui/material';
import { FC } from 'react';

import { Book } from '../../utils/firebase';

const BookInShelfDetail: FC<Book> = ({ title, author, thumbnail }) => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#000',
			padding: '1rem',
			borderRadius: '8px'
		}}
	>
		<Card sx={{ width: '30%' }}>
			<img
				src={thumbnail}
				alt={title}
				onError={e =>
					(e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no_thumbnail.jpg`)
				}
			/>
		</Card>
		<CardContent sx={{ width: '70%', padding: '1rem' }}>
			<Typography variant="h5" component="h2">
				{title}
			</Typography>
			<Typography variant="body2" component="p">
				{author}
			</Typography>
		</CardContent>
	</Box>
);

export default BookInShelfDetail;
