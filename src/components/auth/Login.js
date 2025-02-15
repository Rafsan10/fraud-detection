// src/components/auth/Login.js
import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {getAuth} from "firebase/auth";
import {Box, TextField, Button, Typography, Paper} from "@mui/material";
import {motion} from "framer-motion";
import background from "../../assets/background.jpg"; // Ensure this path is correct

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
					// Fetch the user's document to check their role
					const userDoc = await getDoc(doc(db, "users", currentUser.uid));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						if (userData.role === "admin") {
							navigate("/admin");
						} else {
							navigate("/dashboard");
						}
					} else {
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

	// Animation variants for the login card
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
								Login
							</Typography>
							{error && (
								<Typography variant="body1" color="error" align="center">
									{error}
								</Typography>
							)}
							<Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2}}>
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
								<Button type="submit" variant="contained" color="primary" fullWidth>
									Login
								</Button>
							</Box>
						</Paper>
					</motion.div>
				</Box>
			</Box>
		</Box>
	);
};

export default Login;
