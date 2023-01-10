import {
	Box,
	Card,
	CardContent,
	Chip,
	Container,
	Grid,
	IconButton,
	InputBase,
	Paper,
	Typography
} from '@mui/material';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { Book } from '../utils/firebase';
import FavoriteButton from '../components/buttons/FavoriteButton';
import ProgressButton from '../components/buttons/ProgressButton';
import useData from '../hooks/useData';
import usePageTitle from '../hooks/usePageTitle';

const BookSearch = () => {
	usePageTitle('Book search');
	const user = useLoggedInUser();
	const books = useData()?.books ?? [];
	const tags = useData()?.tags ?? [];
	const [searchQuery, setSearchQuery] = useState('');
	const [chips, setChips] = useState<string[]>([]);
	const [chipsChecked, setChipsChecked] = useState<boolean[]>([]);
	const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		let filtered = books;
		if (searchQuery) {
			filtered = filtered.filter(book =>
				book.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
		}
		if (chipsChecked.filter(Boolean).length > 0) {
			const selectedChips = chips.filter((_t, i) => chipsChecked[i]);
			const bookTitles = tags
				.filter(t => selectedChips.includes(t.tag))
				.map(tag => tag.title);
			filtered = filtered.filter(book => bookTitles.includes(book.title));
		}
		setFilteredBooks(filtered);
	}, [searchQuery, chipsChecked, books]);

	useEffect(() => setChips(Array.from(new Set(tags.map(t => t.tag)))), [tags]);

	const handleChipClick = (index: number) => {
		setChipsChecked(prevChecked => {
			const newChecked = [...prevChecked];
			newChecked[index] = !newChecked[index];
			return newChecked;
		});
	};

	return (
		<Box
			sx={{ paddingTop: '150px', backgroundColor: '#7798AB', color: 'white' }}
		>
			<Container
				sx={{
					textAlign: 'center',
					display: 'block',
					justifyContent: 'center',
					listStyle: 'none'
				}}
			>
				<Typography variant="h4">Zoznam všetkých kníh</Typography>
				<Paper
					sx={{
						display: 'flex',
						justifyContent: 'center',
						backgroundColor: 'transparent',
						p: 0.5,
						m: 2,
						boxShadow: 'none'
					}}
				>
					<Box>
						{chips.map((t, i) => (
							<Chip
								key={t}
								label={t}
								variant="outlined"
								sx={{
									margin: '0 5px',
									color: chipsChecked[i] ? 'rgba(0, 0, 0, 0.6)' : 'white',
									backgroundColor: chipsChecked[i]
										? 'white'
										: 'rgba(255, 255, 255, 0.2)'
								}}
								onClick={() => handleChipClick(i)}
								onDelete={
									chipsChecked[i] ? () => handleChipClick(i) : undefined
								}
							/>
						))}
					</Box>
				</Paper>
				<InputBase
					sx={{
						borderRadius: '25px',
						backgroundColor: 'rgba(255, 255, 255, 0.2)',
						width: '50%',
						height: '50px',
						display: 'flex',
						margin: '0 auto',
						paddingLeft: '25px'
					}}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder="Search"
					endAdornment={
						<IconButton aria-label="search">
							<SearchIcon />
						</IconButton>
					}
				/>
			</Container>
			<Container
				sx={{
					minWidth: '80%'
				}}
			>
				{filteredBooks.map((b, i) => (
					<Card
						sx={{
							height: 110,
							border: '2px solid white',
							borderRadius: '10px',
							backgroundColor: 'rgba(255, 255, 255, 0.3)',
							margin: '0.5rem',
							color: 'white'
						}}
						key={i}
					>
						<Grid container sx={{ display: 'flex' }}>
							<Grid
								item
								xs={0.7}
								sx={{ textAlign: 'center', alignItems: 'center' }}
								onClick={() => navigate(`/book-detail?title=${b.title}`)}
							>
								<img
									src={b.thumbnail}
									alt={b.title}
									style={{
										maxHeight: '95px',
										marginTop: '5px',
										objectFit: 'cover'
									}}
									onError={e =>
										(e.currentTarget.src = `${process.env.PUBLIC_URL}/images/no_thumbnail.jpg`)
									}
								/>
							</Grid>
							<Grid item xs={10.8}>
								<CardContent>
									<Typography variant="h5" component="h2">
										{b.title}
									</Typography>
									<Typography variant="subtitle2" component="p">
										{b.author}
									</Typography>
									<Typography variant="subtitle2" component="p">
										{b.releaseDate}
									</Typography>
								</CardContent>
							</Grid>
							<Grid item xs={0.2} sx={{ display: 'grid' }}>
								<FavoriteButton {...b} />
								<ProgressButton {...b} />
							</Grid>
						</Grid>
					</Card>
				))}
			</Container>
		</Box>
	);
};

export default BookSearch;
