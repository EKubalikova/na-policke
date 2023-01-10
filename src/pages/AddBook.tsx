import {
	Box,
	Button,
	IconButton,
	MenuItem,
	Paper,
	Select,
	TextField,
	Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { addDoc } from 'firebase/firestore';
import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import superagent from 'superagent';

import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	booksCollection,
	tagsCollection,
	noBookWithSameTitleExists
} from '../utils/firebase';
import TagInput from '../components/TagInput';
import formStyles from '../styles/formStyles';
import FormTextField from '../components/FormTextField';
import useData from '../hooks/useData';
import usePageTitle from '../hooks/usePageTitle';

const AddBook = () => {
	usePageTitle('Add Book');
	const user = useLoggedInUser();
	const navigate = useNavigate();

	const [searchParams, _setSearchParams] = useSearchParams();

	const [title, setTitle, titleProps] = useField('title', true);
	const [author, setAuthor, authorProps] = useField('author', true);
	const [shelf, setShelf, _shelfProps] = useField('shelf', true);
	const [isbn, _setIsbn, isbnProps] = useField('isbn', false);
	const [releaseDate, setReleaseDate, releaseDateProps] = useField(
		'releaseDate',
		false
	);
	const [pageCount, setPageCount, pageCountProps] = useField('pageCount', true);
	const [thumbnail, setThumbnail, thumbnailProps] = useField(
		'thumbnail',
		false
	);
	const [tags, setTags] = useState<string[]>([]);

	const shelves = useData()?.shelves ?? [];

	useEffect(() => {
		const shelfSearchParam = searchParams.get('shelf');
		if (shelfSearchParam !== null) {
			setShelf(shelfSearchParam);
		}
	}, [searchParams]);

	const [submitError, setSubmitError] = useState<string>();

	const handleChangeTags = (newTags: string[]) => {
		setTags(newTags);
	};

	const loadBookData = () => {
		superagent
			.get('https://www.googleapis.com/books/v1/volumes')
			.query({ q: `isbn:${isbn}` })
			.then(data => {
				fillInForm(data.body.items[0].volumeInfo);
			})
			.catch(() => {
				alert('Pre toto ISBN neboli nájdené žiadne dáta');
			});
	};

	const fillInForm = (volumeInfo: {
		title: string;
		authors: string[];
		publishedDate: string;
		pageCount: string;
		imageLinks?: { smallThumbnail: string };
	}) => {
		setTitle(volumeInfo.title);
		setAuthor(volumeInfo.authors.join('; '));
		setReleaseDate(volumeInfo.publishedDate);
		setPageCount(volumeInfo.pageCount);
		if (volumeInfo.imageLinks) {
			setThumbnail(volumeInfo.imageLinks.smallThumbnail);
		}
	};

	const loadData = async () => {
		if (!isbn) {
			alert('ISBN nie je vyplnené');
			return;
		}

		loadBookData();
	};

	const SearchButton = () => (
		<IconButton onClick={loadData}>
			<SearchIcon />
		</IconButton>
	);

	return (
		<Box
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					if (!user?.email) {
						setSubmitError('Chyba');
						return;
					}

					if (await noBookWithSameTitleExists(title, user.email)) {
						setSubmitError(
							'Kniha s rovnakým názvom už existuje. Prosím zadaj knihe nový názov.'
						);
						return;
					}

					await addDoc(booksCollection, {
						email: user.email,
						shelf,
						isbn: Number(isbn),
						releaseDate: Number(releaseDate),
						title,
						author,
						pageCount: Number(pageCount),
						thumbnail
					});
					tags.forEach(async tag => {
						await addDoc(tagsCollection, {
							email: user.email,
							title,
							tag
						});
					});
					navigate(-1);
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Neznáma chyba!'
					);
				}
			}}
			sx={{
				backgroundColor: '#153C0F',
				...formStyles.pageBackground
			}}
		>
			<Box sx={{ width: '450px', margin: '0 auto', paddingTop: '50px' }}>
				<Typography
					variant="h5"
					component="h2"
					sx={{ ...formStyles.formTitle }}
				>
					Pridaj názov poličky, kam si neskôr začneš ukladať svoje knihy
				</Typography>
				<Typography
					variant="subtitle1"
					textAlign="center"
					sx={{ color: 'white', paddingBottom: '1rem' }}
				>
					TIP: Zadajte ISBN a údaje o knihe sa vyplnia automaticky
				</Typography>

				<Paper
					sx={{
						...formStyles.form
					}}
				>
					{' '}
					<TextField
						label="ISBN"
						{...isbnProps}
						type="number"
						InputLabelProps={{
							style: formStyles.inputLabel
						}}
						InputProps={{
							style: formStyles.textField,
							endAdornment: <SearchButton />
						}}
					/>
					<FormTextField label="Názov knihy" {...titleProps} type="text" />
					<FormTextField label="Autor" {...authorProps} type="text" />
					<FormTextField
						label="Rok vydania"
						{...releaseDateProps}
						type="number"
					/>
					<FormTextField
						label="Počet strán"
						{...pageCountProps}
						type="number"
					/>
					<TagInput onChangeTags={handleChangeTags} />
					<FormTextField label="URL obálky" {...thumbnailProps} type="text" />
					<Select
						label="Knihu uložiť do poličky"
						type="text"
						value={shelf}
						readOnly={searchParams.get('shelf') !== null}
						onChange={e => setShelf(e.target.value as string)}
						sx={{ ...formStyles.textField }}
					>
						{shelves
							.filter(s => s.email === user?.email)
							.map((shelf, i) => (
								<MenuItem key={i} value={shelf.title}>
									{shelf.title}
								</MenuItem>
							))}
					</Select>
					<Box
						sx={{
							...formStyles.buttonsBlock
						}}
					>
						{submitError && (
							<Typography
								variant="caption"
								textAlign="right"
								sx={{ color: 'error.main' }}
							>
								{submitError}
							</Typography>
						)}
						<Button
							variant="outlined"
							sx={{
								...formStyles.button
							}}
							onClick={() => navigate('/')}
						>
							Zrušiť
						</Button>
						<Button
							type="submit"
							variant="contained"
							sx={{
								backgroundColor: '#153C0F',
								...formStyles.button
							}}
						>
							Pridať knihu
						</Button>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
};

export default AddBook;
