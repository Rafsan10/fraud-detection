// src/components/auth/Register.js
import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {updateProfile, getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {setDoc, doc} from "firebase/firestore";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";

const Register = () => {
	const {register} = useContext(AuthContext);
	const navigate = useNavigate();
	const auth = getAuth();

	// State for name, email, and passwords
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		const success = await register(email, password);
		if (success) {
			try {
				// Update the user's profile with the provided name
				await updateProfile(auth.currentUser, {displayName: name});

				// Create or update the user document with the UID as the document ID
				await setDoc(doc(db, "users", auth.currentUser.uid), {
					uid: auth.currentUser.uid,
					email: auth.currentUser.email,
					displayName: name,
					status: "active",
					role: "user", // default role is "user"; update manually to "admin" as needed
					createdAt: new Date().toISOString(),
				});
			} catch (err) {
				console.error("Error updating profile or creating user document:", err);
			}
			navigate("/dashboard");
		} else {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<Paper elevation={3} sx={{maxWidth: 400, margin: "20px auto", padding: 2}}>
			<Typography variant="h5" gutterBottom>
				Register
			</Typography>
			{error && (
				<Typography variant="body1" color="error">
					{error}
				</Typography>
			)}
			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					label="Name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					fullWidth
					required
					sx={{marginBottom: 2}}
				/>
				<TextField
					label="Email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					required
					sx={{marginBottom: 2}}
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					required
					sx={{marginBottom: 2}}
				/>
				<TextField
					label="Confirm Password"
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					fullWidth
					required
					sx={{marginBottom: 2}}
				/>
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Register
				</Button>
			</Box>
		</Paper>
	);
};

export default Register;
