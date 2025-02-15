// src/components/common/Navbar.js
import React from "react";
import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link} from "react-router-dom";
import NotificationButton from "./NotificationButton";

const Navbar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" sx={{flexGrow: 1}}>
					PayFin
				</Typography>
				<Box sx={{display: {xs: "none", sm: "block"}}}>
					<Button color="inherit" component={Link} to="/">
						Home
					</Button>
					<Button color="inherit" component={Link} to="/login">
						Login
					</Button>
					<Button color="inherit" component={Link} to="/register">
						Register
					</Button>
				</Box>
				<NotificationButton />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
