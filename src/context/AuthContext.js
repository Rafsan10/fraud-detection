// src/context/AuthContext.js
import React, {createContext, useState, useEffect} from "react";
import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {app} from "../firebase"; // Make sure firebase.js exports "app"

const auth = getAuth(app);

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Listen for authentication state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	// Function to log in a user using Firebase Authentication
	const login = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			return true;
		} catch (error) {
			console.error("Login error:", error);
			return false;
		}
	};

	// Function to register a new user using Firebase Authentication
	const register = async (email, password) => {
		try {
			await createUserWithEmailAndPassword(auth, email, password);
			return true;
		} catch (error) {
			console.error("Register error:", error);
			return false;
		}
	};

	// Function to log out the current user
	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<AuthContext.Provider value={{user, login, register, logout}}>
			{/* Only render children once loading is complete */}
			{!loading && children}
		</AuthContext.Provider>
	);
};
