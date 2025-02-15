// src/components/auth/Register.js
import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {updateProfile, getAuth} from "firebase/auth";
import {db} from "../../firebase";
import {setDoc, doc} from "firebase/firestore";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";
import {motion} from "framer-motion";
import background from "../../assets/background.jpg"; // Ensure this path is correct

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
				// Create a user document in the "users" collection with UID as the doc ID
				await setDoc(doc(db, "users", auth.currentUser.uid), {
					uid: auth.currentUser.uid,
					email: auth.currentUser.email,
					displayName: name,
					status: "active",
					role: "user", // default role is "user"
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

	// Define animation variants for the form card
	const cardVariants = {
		hidden: {opacity: 0, y: 50},
		visible: {
			opacity: 1,
			y: 0,
			transition: {duration: 0.8, ease: "easeOut"},
		},
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				display: "flex",
				alignItems: "center",
			}}
		>
			<Box sx={{width: "100%"}}>
				<Box sx={{maxWidth: 400, mx: "auto"}}>
					<motion.div initial="hidden" animate="visible" variants={cardVariants}>
						<Paper
							elevation={6}
							sx={{
								padding: 4,
								borderRadius: 2,
								backgroundColor: "rgba(255,255,255,0.9)",
							}}
						>
							<Typography variant="h5" gutterBottom align="center">
								Register
							</Typography>
							{error && (
								<Typography variant="body1" color="error" align="center">
									{error}
								</Typography>
							)}
							<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
								<TextField
									label="Name"
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									fullWidth
									required
									sx={{mb: 2}}
								/>
								<TextField
									label="Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									fullWidth
									required
									sx={{mb: 2}}
								/>
								<TextField
									label="Password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									fullWidth
									required
									sx={{mb: 2}}
								/>
								<TextField
									label="Confirm Password"
									type="password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									fullWidth
									required
									sx={{mb: 2}}
								/>
								<Button type="submit" variant="contained" color="primary" fullWidth>
									Register
								</Button>
							</Box>
						</Paper>
					</motion.div>
				</Box>
			</Box>
		</Box>
	);
};

export default Register;
