// src/components/common/Navbar.js
import React, {useContext} from "react";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import NotificationButton from "./NotificationButton";
import {AuthContext} from "../../context/AuthContext";

const Navbar = () => {
	const {user, logout} = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" sx={{flexGrow: 1}}>
					PayFin
				</Typography>
				<Box sx={{display: {xs: "none", sm: "block"}}}>
					{!user && (
						<>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/register">
								Register
							</Button>
						</>
					)}
					{user && (
						<>
							<Button color="inherit" component={Link} to="/dashboard">
								Dashboard
							</Button>
							<Button color="inherit" onClick={handleLogout}>
								Logout
							</Button>
						</>
					)}
				</Box>
				<NotificationButton />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
