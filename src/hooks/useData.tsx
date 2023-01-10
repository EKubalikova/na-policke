import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';
import { onSnapshot, query, where } from 'firebase/firestore';

import {
	Book,
	booksCollection,
	NamedUser,
	namedUsersCollection,
	Note,
	notesCollection,
	Shelf,
	shelvesCollection,
	Tag,
	tagsCollection
} from '../utils/firebase';

import useLoggedInUser from './useLoggedInUser';

type DataContextType = {
	shelves: Shelf[];
	books: Book[];
	namedUsers: NamedUser[];
	notes: Note[];
	tags: Tag[];
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<PropsWithChildren> = ({ children }) => {
	const user = useLoggedInUser();
	const [data, setData] = useState<DataContextType>({
		shelves: [],
		books: [],
		namedUsers: [],
		notes: [],
		tags: []
	});

	useEffect(() => {
		if (user) {
			const bookQuery = query(
				booksCollection,
				where('email', '==', user.email)
			);
			const unsubscribeBooks = onSnapshot(bookQuery, snapshot => {
				setData(prevData => ({
					...prevData,
					books: snapshot.docs.map(doc => doc.data())
				}));
			});

			const shelvesQuery = query(
				shelvesCollection,
				where('email', '==', user.email)
			);
			const unsubscribeShelves = onSnapshot(shelvesQuery, snapshot => {
				setData(prevData => ({
					...prevData,
					shelves: snapshot.docs.map(doc => doc.data())
				}));
			});

			const namedUsersQuery = query(
				namedUsersCollection,
				where('email', '==', user.email)
			);
			const unsubscribeNamedUsers = onSnapshot(namedUsersQuery, snapshot => {
				setData(prevData => ({
					...prevData,
					namedUsers: snapshot.docs.map(doc => doc.data())
				}));
			});

			const notesQuery = query(
				notesCollection,
				where('email', '==', user.email)
			);
			const unsubscribeNotes = onSnapshot(notesQuery, snapshot => {
				setData(prevData => ({
					...prevData,
					notes: snapshot.docs.map(doc => doc.data())
				}));
			});

			const tagsQuery = query(tagsCollection, where('email', '==', user.email));
			const unsubscribeTags = onSnapshot(tagsQuery, snapshot => {
				setData(prevData => ({
					...prevData,
					tags: snapshot.docs.map(doc => doc.data())
				}));
			});
			return () => {
				unsubscribeShelves();
				unsubscribeBooks();
				unsubscribeNamedUsers();
				unsubscribeNotes();
				unsubscribeTags();
			};
		}
	}, [user]);

	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

const useData = () => useContext(DataContext);

export default useData;
