// src/components/common/Navbar.js
import React from "react";
import {AppBar, Toolbar, Typography, Box} from "@mui/material";
import NotificationButton from "./NotificationButton";
import {Link} from "react-router-dom";

const Navbar = () => {
	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
					<Link to="/" style={{textDecoration: "none", color: "inherit"}}>
						Fraud Detection Dashboard
					</Link>
				</Typography>
				<NotificationButton />
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
