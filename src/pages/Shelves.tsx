import { Box } from '@mui/material';

import Shelf from '../components/Shelf';
import useData from '../hooks/useData';
import usePageTitle from '../hooks/usePageTitle';

const Shelves = () => {
	usePageTitle('Shelves');
	const shelves = useData()?.shelves ?? [];

	return (
		<Box sx={{ backgroundColor: '#7798AB', paddingTop: '150px' }}>
			{shelves.map((shelf, i) => (
				<Shelf key={i} {...shelf} />
			))}
		</Box>
	);
};

export default Shelves;
