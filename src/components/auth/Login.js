// src/components/auth/Login.js
import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {getAuth} from "firebase/auth";

const Login = () => {
	const {login} = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const success = await login(email, password);
		if (success) {
			const auth = getAuth();
			const currentUser = auth.currentUser;

			if (currentUser) {
				try {
					// Fetch the user's document using their UID
					const userDoc = await getDoc(doc(db, "users", currentUser.uid));
					if (userDoc.exists()) {
						console.log("admin");
						const userData = userDoc.data();
						// Check the role field and redirect accordingly
						if (userData.role === "admin") {
							navigate("/admin");
						} else {
							navigate("/dashboard");
							console.log("user");
						}
					} else {
						// If no document is found, fallback to dashboard
						navigate("/dashboard");
					}
				} catch (err) {
					console.error("Error checking user role:", err);
					navigate("/dashboard");
				}
			} else {
				setError("User not found after login.");
			}
		} else {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<Paper elevation={3} sx={{maxWidth: 400, margin: "20px auto", padding: 2}}>
			<Typography variant="h5" gutterBottom>
				Login
			</Typography>
			{error && (
				<Typography variant="body1" color="error">
					{error}
				</Typography>
			)}
			<Box component="form" onSubmit={handleSubmit} noValidate>
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
				<Button type="submit" variant="contained" color="primary" fullWidth>
					Login
				</Button>
			</Box>
		</Paper>
	);
};

export default Login;
