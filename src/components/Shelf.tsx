import { Box, Grid, IconButton } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { makeStyles } from '@material-ui/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Shelf as TypeShelf } from '../utils/firebase';
import useData from '../hooks/useData';

import BookCard from './bookDetails/BookCard';

const useStyles = makeStyles({
	carousel: {
		width: '80vw',
		paddingTop: '100px'
	},
	carouselItem: {
		borderRadius: '25px'
	}
});

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 10
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1
	}
};

const Shelf: FC<TypeShelf> = ({ email, title }) => {
	const books = useData()?.books ?? [];
	const classes = useStyles();
	const navigate = useNavigate();

	const redirectToAddBookToShelf = () => {
		navigate(`/add-book?shelf=${title}`);
	};

	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative'
				}}
			>
				<Carousel
					containerClass={classes.carousel}
					itemClass={classes.carouselItem}
					responsive={responsive}
				>
					{books
						.filter(b => b.email === email && b.shelf === title)
						.map((b, i) => (
							<BookCard key={i} {...b} />
						))}
				</Carousel>
			</Box>
			<Grid
				container
				style={{
					borderRadius: '10px',
					backgroundColor: '#663300',
					color: 'white',
					margin: '0 auto',
					width: '80%',
					height: '35px'
				}}
			>
				<Grid
					item
					sm={11}
					sx={{
						display: 'flex',
						justifyContent: 'left',
						alignItems: 'center',
						height: 'inherit',
						paddingLeft: '10px'
					}}
				>
					{title}
				</Grid>
				<Grid
					item
					sm={1}
					sx={{
						justifyContent: 'end',
						display: 'flex',
						height: 'inherit'
					}}
				>
					{' '}
					<IconButton
						style={{ color: '#fff' }}
						onClick={redirectToAddBookToShelf}
					>
						<AddCircleIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Shelf;
