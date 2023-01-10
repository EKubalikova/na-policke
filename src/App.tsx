import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { UserProvider } from './hooks/useLoggedInUser';
import theme from './utils/theme';
import AppRoutes from './components/AppRoutes';
import LogoShelfee from './components/LogoShelfee';
import NavigationBar from './components/NavigationBar';
import { DataProvider } from './hooks/useData';

const App = () => (
	<UserProvider>
		<DataProvider>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseline />
					<LogoShelfee />
					<NavigationBar />
					<AppRoutes />
				</BrowserRouter>
			</ThemeProvider>
		</DataProvider>
	</UserProvider>
);

export default App;
