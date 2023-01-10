import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: { main: '#f2d45c' },
		mode: 'light'
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'body, #root': {
					display: 'grid',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});

export default theme;
