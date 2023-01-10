import { Box, Button, Container, Typography } from '@mui/material';

import useData from '../hooks/useData';
import useLoggedInUser from '../hooks/useLoggedInUser';

import AddShelf from './dialogs/AddShelf';
import BookCard from './bookDetails/BookCard';
import BookCardInProgress from './bookDetails/BookCardInProgress';
import LogoShelfee from './LogoShelfee';

const HomePageLoggedIn = () => {
	const user = useLoggedInUser();
	const data = useData();
	const shelves = data?.shelves ?? [];
	const books = useData()?.books ?? [];
	const namedUsers = data?.namedUsers ?? [];

	return (
		<>
			<LogoShelfee />
			<Box sx={{ marginTop: '150px' }}>
				<Typography
					variant="h4"
					textAlign="center"
					zIndex={5}
					sx={{ margin: '0 30%' }}
				>
					{!shelves.some(shelve => shelve.email === user?.email)
						? `Ahoj ${namedUsers[0]?.name}, 
						začni si vytvárať poličky
						a pridávať na ne svoje knihy.`
						: `Ahoj, ${namedUsers[0]?.name} ${namedUsers[0]?.surname}!`}
				</Typography>

				{!shelves.some(shelve => shelve.email === user?.email) && (
					<Container
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<AddShelf>
							{open => (
								<Button
									onClick={open}
									variant="outlined"
									sx={{
										border: '2px solid #FFFFFF',
										borderRadius: '10px',
										backgroundColor: 'rgba(255, 255, 255, 0.4)',
										color: 'white',
										margin: '3rem 0 0 0',
										width: '15rem',
										height: '3.3rem',
										textTransform: 'none',
										fontSize: '20px'
									}}
								>
									Pridať poličku
								</Button>
							)}
						</AddShelf>
					</Container>
				)}
				{books.filter(
					b =>
						b.pageCurrent !== undefined &&
						b.pageCurrent > 0 &&
						b.pageCurrent < b.pageCount
				).length > 0 && (
					<Typography variant="h4" textAlign="left">
						...práve čítaš
					</Typography>
				)}
				{books
					.filter(
						b =>
							b.pageCurrent !== undefined &&
							b.pageCurrent > 0 &&
							b.pageCurrent < b.pageCount
					)
					.map((b, i) => (
						<BookCardInProgress key={i} {...b} />
					))}
				{books.some(book => book.isInFavorites) && (
					<Typography variant="h4" textAlign="left" sx={{ marginTop: '50px' }}>
						Obľúbené knihy
					</Typography>
				)}
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(6, 1fr)',
						width: '80vw'
					}}
				>
					{' '}
					{books
						.filter(b => b.isInFavorites)
						.map((b, i) => (
							<BookCard key={i} {...b} />
						))}
				</Box>
			</Box>
		</>
	);
};

export default HomePageLoggedIn;
