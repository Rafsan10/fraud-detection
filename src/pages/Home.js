// src/pages/Home.js
import React from "react";
import {Container, Typography, Button, Box, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import background from "../assets/background.jpg"; // Ensure this file exists in src/assets/

const Home = () => {
	// Animation variants for the hero card
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
			<Container maxWidth="md">
				<motion.div initial="hidden" animate="visible" variants={cardVariants}>
					<Paper
						elevation={6}
						sx={{
							padding: 4,
							backgroundColor: "rgba(255,255,255,0.85)",
							borderRadius: 2,
						}}
					>
						<Typography variant="h3" align="center" gutterBottom>
							PayFin
						</Typography>
						<Typography variant="h6" align="center" gutterBottom>
							Integrated Fraud Detection & Financial Dashboard System
						</Typography>
						<Typography variant="body1" align="center" gutterBottom>
							Protect your finances with real-time fraud detection and comprehensive
							financial insights.
						</Typography>
						<Box
							sx={{
								display: "flex",
								gap: 2,
								flexWrap: "wrap",
								mt: 4,
								justifyContent: "center",
							}}
						>
							<Button variant="contained" component={Link} to="/login">
								Login
							</Button>
							<Button variant="outlined" component={Link} to="/register">
								Register
							</Button>
						</Box>
					</Paper>
				</motion.div>
			</Container>
		</Box>
	);
};

export default Home;
