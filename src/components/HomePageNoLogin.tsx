import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePageNoLogin = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}
	>
		<img
			src={`${process.env.PUBLIC_URL}/images/logo_shelfee_white.png`}
			alt="Logo"
			width="20%"
			height="auto"
			color="white"
		/>
		<Typography variant="h4" mt={2} mr={4} display="inline" color="white">
			Vytvor si svoju online knižnicu
		</Typography>
		<Button
			component={Link}
			to="/register"
			variant="outlined"
			sx={{
				borderColor: 'white',
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
			Registrácia
		</Button>
		<Typography variant="body2" display="inline" sx={{ marginTop: '0.8rem' }}>
			Máte účet?{' '}
			<Link to="/login" style={{ color: 'white' }}>
				Prihláste sa.
			</Link>
		</Typography>
	</Box>
);

export default HomePageNoLogin;
