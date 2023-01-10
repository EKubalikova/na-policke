import { Box } from '@mui/material';

const ProgressBar = (props: {
	pageCount: number | undefined;
	pageCurrent: number | undefined;
}) => {
	const { pageCount, pageCurrent } = props;

	const progress =
		pageCurrent && pageCount && pageCount !== 0
			? Math.floor((100 * pageCurrent) / pageCount)
			: 0;

	return (
		<Box
			sx={{
				color: 'white',
				backgroundColor: 'rgba(255, 255, 255, 0.3)',
				borderRadius: '15px',
				height: '30px',
				border: '2px solid white'
			}}
		>
			<Box
				sx={{
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(255, 255, 255, 0.3)',
					borderRadius: 'inherit',
					textAlign: 'right',
					border: '2px solid white'
				}}
				style={{ width: `${progress}%` }}
			>
				<Box
					sx={{
						color: 'black',
						textAlign: 'center',
						display: 'grid',
						fontSize: '0.8rem',
						marginTop: '0.1rem'
					}}
				>{`${progress}%`}</Box>
			</Box>
		</Box>
	);
};

export default ProgressBar;
