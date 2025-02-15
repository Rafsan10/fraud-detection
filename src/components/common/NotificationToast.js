// src/components/common/NotificationToast.js
import React, {useEffect, useState, useContext} from "react";
import {Snackbar, Alert} from "@mui/material";
import {NotificationContext} from "../../context/NotificationContext";

const NotificationToast = () => {
	const {notifications} = useContext(NotificationContext);
	const [open, setOpen] = useState(false);
	const [currentMessage, setCurrentMessage] = useState(null);

	useEffect(() => {
		// Find unread notifications
		const unreadNotifications = notifications.filter((n) => !n.read);
		if (unreadNotifications.length > 0) {
			// Show the first unread notification (or the most recent, as you prefer)
			setCurrentMessage(unreadNotifications[0]);
			setOpen(true);
		}
	}, [notifications]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={5000} // Display for 5 seconds
			onClose={handleClose}
			anchorOrigin={{vertical: "bottom", horizontal: "center"}}
		>
			{currentMessage && (
				<Alert onClose={handleClose} severity={currentMessage.type} sx={{width: "100%"}}>
					{currentMessage.message}
				</Alert>
			)}
		</Snackbar>
	);
};

export default NotificationToast;
