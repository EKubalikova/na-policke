import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	addDoc,
	collection,
	CollectionReference,
	deleteDoc,
	getDocs,
	getFirestore,
	limit,
	query,
	updateDoc,
	where
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyAqO25kQx_aijnb7KK5nnJCSZU5uVUgwEs',
	authDomain: 'na-policke.firebaseapp.com',
	projectId: 'na-policke',
	storageBucket: 'na-policke.appspot.com',
	messagingSenderId: '186645371424',
	appId: '1:186645371424:web:764cbc5eb72909dc91ba45'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (
	name: string,
	surname: string,
	email: string,
	password: string
) => {
	createUserWithEmailAndPassword(auth, email, password);
	addDoc(namedUsersCollection, {
		name,
		surname,
		email
	});
};

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

export type NamedUser = {
	email: string;
	name: string;
	surname: string;
};

export const namedUsersCollection = collection(
	db,
	'namedUsers'
) as CollectionReference<NamedUser>;

export type Shelf = {
	email: string;
	title: string;
};

export const shelvesCollection = collection(
	db,
	'shelves'
) as CollectionReference<Shelf>;

export type Book = {
	email: string;
	shelf: string;
	isbn?: number;
	releaseDate?: number;
	title: string;
	author: string;
	pageCount: number;
	thumbnail?: string;
	pageCurrent?: number;
	isInFavorites?: boolean;
};

export const booksCollection = collection(
	db,
	'books'
) as CollectionReference<Book>;

export type Tag = {
	email: string;
	title: string;
	tag: string;
};

export const tagsCollection = collection(
	db,
	'tags'
) as CollectionReference<Tag>;

export type Note = {
	email: string;
	title: string;
	note: string;
};

export const notesCollection = collection(
	db,
	'notes'
) as CollectionReference<Note>;

export const updateBooksInFavorites = async (book: Book) => {
	const bookRef = query(
		booksCollection,
		where('title', '==', book.title),
		where('email', '==', book.email),
		limit(1)
	);

	const snapshot = await getDocs(bookRef);
	if (snapshot.empty) {
		console.error('Book not found');
		return;
	}

	const doc = snapshot.docs[0];
	await updateDoc(doc.ref, 'isInFavorites', !book.isInFavorites);
};

export const updateBooksProgress = async (book: Book, progress: number) => {
	const bookRef = query(
		booksCollection,
		where('title', '==', book.title),
		where('email', '==', book.email),
		limit(1)
	);

	const snapshot = await getDocs(bookRef);
	if (snapshot.empty) {
		console.error('Book not found');
		return;
	}

	const doc = snapshot.docs[0];
	await updateDoc(doc.ref, 'pageCurrent', progress);
};

export const noBookWithSameTitleExists = async (
	title: string,
	email: string | null | undefined
) => {
	const bookRef = query(
		booksCollection,
		where('title', '==', title),
		where('email', '==', email)
	);

	const snapshot = await getDocs(bookRef);
	return !snapshot.empty;
};

export const deleteBook = async (book: Book | undefined) => {
	const title = book?.title;
	const email = book?.email;

	const bookQuery = query(
		booksCollection,
		where('title', '==', title),
		where('email', '==', email),
		limit(1)
	);
	const booksSnapshot = await getDocs(bookQuery);
	booksSnapshot.forEach(doc => deleteDoc(doc.ref));

	const notesQuery = query(
		notesCollection,
		where('title', '==', title),
		where('email', '==', email)
	);
	const notesSnapshot = await getDocs(notesQuery);
	notesSnapshot.forEach(doc => deleteDoc(doc.ref));

	const tagsQuery = query(
		tagsCollection,
		where('title', '==', title),
		where('email', '==', email)
	);
	const tagsSnapshot = await getDocs(tagsQuery);
	tagsSnapshot.forEach(doc => deleteDoc(doc.ref));
};
