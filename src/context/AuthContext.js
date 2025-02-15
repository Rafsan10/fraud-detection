// src/context/AuthContext.js

import React, {createContext, useState} from "react";

// Create the context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
	// user state will hold the current logged in user
	const [user, setUser] = useState(null);

	// Simulated login function using dummy data
	const login = (email, password) => {
		// In a real application, you'd validate credentials with an API.
		// Here, we'll simulate with a hardcoded user for demonstration.
		const dummyUser = {
			id: "user1",
			name: "Alice",
			email: "alice@example.com",
			password: "password123",
			ip: "192.168.1.1",
			role: "user",
		};

		// Check if provided credentials match the dummy user's
		if (email === dummyUser.email && password === dummyUser.password) {
			setUser(dummyUser);
			return true;
		}
		return false;
	};

	// Simulated logout function
	const logout = () => {
		setUser(null);
	};

	return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>;
};
