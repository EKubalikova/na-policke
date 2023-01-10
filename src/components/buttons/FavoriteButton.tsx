import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import { FC } from 'react';

import { Book, updateBooksInFavorites } from '../../utils/firebase';

const FavoriteButton: FC<Book> = (book: Book) => (
	<IconButton
		style={{ color: book.isInFavorites ? '#ff0000' : '#fff' }}
		onClick={() => updateBooksInFavorites(book)}
	>
		<FavoriteIcon />
	</IconButton>
);

export default FavoriteButton;
