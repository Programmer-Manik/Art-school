import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [paySelectedClg, setPaySelectedClass] = useState({});
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);

	const googleProvider = new GoogleAuthProvider();

	const googleLogin = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const signUp = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const updateUserProfile = (namePhoto) => {
		return updateProfile(auth.currentUser, namePhoto);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log("Current user ; ", currentUser);
			setUser(currentUser);
			setLoading(false);

			if (currentUser && currentUser.email) {
				const loggedUser = {
					email: currentUser.email,
				};
				console.log(loggedUser);
				fetch("https://summer-capm-school-server.vercel.app/jwt", {
					method: "POST",
					headers: {
						"content-type": "application/json",
					},
					body: JSON.stringify(loggedUser),
				})
					.then((res) => res.json())
					.then((data) => {
						console.log("jwt response -> ", data);
						localStorage.setItem("Semmer-access-token", data.token);
					})
					.catch((err) => {
						console.log(err);
					});
			} else {
				localStorage.removeItem("Semmer-access-token");
			}
		});

		return () => {
			return unSubscribe();
		};
	}, []);

	const authInfo = {
		user,
		isLoading,
		googleLogin,
		updateUserProfile,
		signUp,
		signIn,
		logOut,
		paySelectedClg,
		setPaySelectedClass,
	};
	return (
		<AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>
	);
};

export default AuthProvider;
