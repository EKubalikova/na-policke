import { Routes, Route } from 'react-router-dom';

import useLoggedInUser from '../hooks/useLoggedInUser';
import AddBook from '../pages/AddBook';
import BookDetail from '../pages/BookDetail';
import BookSearch from '../pages/BookSearch';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Shelves from '../pages/Shelves';

const AppRoutes = () => {
	const user = useLoggedInUser();

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="*" element={<NotFound />} />
			{!user && (
				<>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</>
			)}
			{user && (
				<>
					<Route path="/shelves" element={<Shelves />} />
					<Route path="/add-book" element={<AddBook />} />
					<Route path="/book-search" element={<BookSearch />} />
					<Route path="/book-detail" element={<BookDetail />} />
				</>
			)}
		</Routes>
	);
};
export default AppRoutes;
