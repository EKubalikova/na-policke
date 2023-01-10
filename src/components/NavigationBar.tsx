import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import useData from '../hooks/useData';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

import AddShelf from './dialogs/AddShelf';

const NavigationBar = () => {
	const user = useLoggedInUser();
	const navigate = useNavigate();
	const shelves = useData()?.shelves ?? [];

	return (
		<AppBar
			sx={{
				position: 'absolute',
				alignItems: 'end',
				backgroundColor: 'transparent',
				boxShadow: 'none'
			}}
		>
			{user?.email && (
				<Container sx={{ display: 'contents' }}>
					<Toolbar disableGutters sx={{ gap: 2 }}>
						{shelves.some(shelve => shelve.email === user?.email) && (
							<>
								<AddShelf>
									{open => (
										<Button
											onClick={open}
											variant="outlined"
											sx={{
												padding: '0 20px',
												color: 'white',
												borderRadius: '20px',
												backgroundColor: 'transparent',
												border: '2px solid white',
												textTransform: 'none',
												fontWeight: 'bold'
											}}
										>
											Pridať poličku
										</Button>
									)}
								</AddShelf>
								<Button
									sx={{
										padding: '0 20px',
										color: 'white',
										borderRadius: '10px',
										backgroundColor: 'transparent',
										border: '2px solid white',
										textTransform: 'none',
										fontWeight: 'bold'
									}}
									component={Link}
									to="/add-book"
								>
									Pridať knihu
								</Button>
								<Button
									sx={{ color: 'white', fontWeight: 'bold' }}
									component={Link}
									to="/book-search"
								>
									Zoznam knih
								</Button>
								<Button
									sx={{ color: 'white', fontWeight: 'bold' }}
									component={Link}
									to="/shelves"
								>
									Poličky
								</Button>
							</>
						)}
						<Button
							onClick={() => {
								signOut();
								navigate('/');
							}}
							sx={{ color: 'white', fontWeight: 'bold' }}
						>
							Odhlásiť sa
						</Button>
						<Box sx={{ flexGrow: 1 }} />
					</Toolbar>
				</Container>
			)}
		</AppBar>
	);
};

export default NavigationBar;
