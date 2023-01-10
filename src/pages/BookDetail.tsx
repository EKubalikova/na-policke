import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AddNote from '../components/dialogs/AddNote';
import useData from '../hooks/useData';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';
import { Book, deleteBook, Tag } from '../utils/firebase';

const BookDetail = () => {
	usePageTitle('Book Detail');
	const user = useLoggedInUser();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const navigate = useNavigate();

	const [book, setBook] = useState<Book>();
	const [tags, setTags] = useState<Tag[]>([]);
	const allTags = useData()?.tags ?? [];
	const notes = useData()?.notes ?? [];
	const books = useData()?.books ?? [];

	useEffect(() => {
		const loadBookData = async () => {
			const titleSearchParam = searchParams.get('title');
			if (titleSearchParam !== null) {
				const book = books.find(b => b.title === titleSearchParam);
				setBook(book);
				const tags = allTags.filter(t => t.title === titleSearchParam);
				setTags(tags);
			}
		};
		loadBookData();
	}, [books]);

	const handleDelete = async () => {
		deleteBook(book);
		navigate('/');
	};

	return (
		<Grid
			container
			sx={{
				backgroundColor: '#153C0F',
				paddingTop: '200px'
			}}
		>
			<Grid
				item
				sm={3}
				sx={{
					display: 'grid',
					justifyContent: 'end'
				}}
			>
				<img
					src={book?.thumbnail}
					alt={book?.title}
					style={{ width: '350px' }}
					onError={e =>
						(e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no_thumbnail.jpg`)
					}
				/>
			</Grid>
			<Grid
				item
				sm={9}
				sx={{
					'display': 'block',
					'paddingLeft': '50px',
					'color': 'white',
					'alignItems': 'center',
					'justifyContent': 'center',
					'& > *': {
						marginBottom: '1rem'
					}
				}}
			>
				<Typography
					variant="h3"
					component="h2"
					sx={{ fontWeight: 'bold', marginBottom: '20px' }}
				>
					{book?.title}
				</Typography>
				<Typography
					variant="h5"
					component="p"
					sx={{ fontWeight: 'bold', marginBottom: '10px' }}
				>
					{book?.author}
				</Typography>
				<Typography variant="h6" component="p">
					{book?.releaseDate}
					{', '}
					{book?.pageCount}
					s.
				</Typography>
				<Typography variant="h6" component="p">
					ISBN: {book?.isbn}
				</Typography>
				<Typography variant="h6" component="p">
					<span style={{ fontWeight: 'bold' }}>Tagy:</span>{' '}
					{Array.from(new Set(tags.map(t => t.tag))).join(', ')}
				</Typography>
				<Typography variant="h6" component="p">
					<span style={{ fontWeight: 'bold' }}>Polička:</span> {book?.shelf}
				</Typography>
				<Typography
					variant="h6"
					sx={{
						marginTop: '5px',
						listStyleType: 'disc',
						lineHeight: '1.2'
					}}
				>
					<div style={{ fontWeight: 'bold' }}>Poznámky:</div>{' '}
					{notes
						.filter(
							note => note.email === user?.email && note.title === book?.title
						)
						.map((note, i) => (
							<Typography
								key={i}
								sx={{
									'::before': {
										content: '"-"',
										marginRight: '8px'
									},
									'marginTop': '8px'
								}}
							>
								{note.note}
							</Typography>
						))}
				</Typography>
				{book && (
					<AddNote title={book.title}>
						{open => (
							<Button
								sx={{
									'display': 'block',
									'marginTop': '25px',
									'padding': '5px 25px',
									'color': 'white',
									'fontSize': 'larger',
									'borderRadius': '10px',
									'backgroundColor': 'transparent',
									'border': '2px solid white',
									'textTransform': 'none',
									':hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)'
									}
								}}
								onClick={open}
							>
								Pridať poznámku
							</Button>
						)}
					</AddNote>
				)}
				<Button
					sx={{
						'display': 'block',
						'marginTop': '25px',
						'padding': '5px 25px',
						'color': 'white',
						'fontSize': 'larger',
						'borderRadius': '10px',
						'backgroundColor': 'transparent',
						'border': '2px solid white',
						'textTransform': 'none',
						':hover': {
							backgroundColor: 'rgba(255, 255, 255, 0.1)'
						}
					}}
					onClick={handleDelete}
				>
					Odstranit knihu
				</Button>
			</Grid>
		</Grid>
	);
};

export default BookDetail;
