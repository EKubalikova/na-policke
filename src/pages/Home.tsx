import { Box } from '@mui/material';

import HomePageLoggedIn from '../components/HomePageLoggedIn';
import HomePageNoLogin from '../components/HomePageNoLogin';
import useLoggedInUser from '../hooks/useLoggedInUser';
import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	return (
		<Box sx={{ color: 'white' }}>
			<Box
				sx={{
					position: 'relative',
					backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/background_shelf.jpg`})`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					height: '100%',
					zIndex: 1,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<Box
					sx={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						background: 'rgba(0, 0, 0, 0.6)',
						zIndex: -1
					}}
				/>
				{user?.email ? <HomePageLoggedIn /> : <HomePageNoLogin />}
			</Box>
		</Box>
	);
};

export default Home;
