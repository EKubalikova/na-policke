import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LogoShelfee = () => (
	<Button
		sx={{
			position: 'absolute',
			width: '250px',
			height: '85px',
			left: '31px',
			top: '21px',
			zIndex: '1'
		}}
		component={Link}
		to="/"
	>
		<img
			src={`${process.env.PUBLIC_URL}/images/logo_shelfee_white.png`}
			alt="Logo"
			width="100%"
			height="100%"
		/>
	</Button>
);

export default LogoShelfee;
