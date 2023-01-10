import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { IconButton } from '@mui/material';
import { FC } from 'react';

import { Book } from '../../utils/firebase';
import ChangeProgress from '../dialogs/ChangeProgress';

const ProgressButton: FC<Book> = (book: Book) => (
	<ChangeProgress book={book}>
		{open => (
			<IconButton style={{ color: '#fff' }} onClick={open}>
				<AutoStoriesIcon />
			</IconButton>
		)}
	</ChangeProgress>
);

export default ProgressButton;
