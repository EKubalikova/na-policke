import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not Found');

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
				<WarningIcon sx={{ typography: 'h1' }} />
				<Typography variant="h2">Knižky sa nenašli 🙁</Typography>
			</Box>
		</Box>
	);
};

export default NotFound;
