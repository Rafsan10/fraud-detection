// src/components/common/NotificationButton.js
import React, {useContext, useState} from "react";
import {
	IconButton,
	Badge,
	Popover,
	List,
	ListItem,
	ListItemText,
	Typography,
	Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NotificationContext} from "../../context/NotificationContext";

const NotificationButton = () => {
	const {notifications, removeNotification} = useContext(NotificationContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "notification-popover" : undefined;

	return (
		<Box>
			<IconButton color="inherit" onClick={handleClick}>
				<Badge badgeContent={notifications.length} color="secondary">
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Box sx={{p: 2, minWidth: 300}}>
					<Typography variant="h6" gutterBottom>
						Notifications
					</Typography>
					{notifications.length === 0 ? (
						<Typography variant="body1">No notifications</Typography>
					) : (
						<List>
							{notifications.map((n) => (
								<ListItem
									key={n.id}
									divider
									button
									onClick={() => removeNotification(n.id)}
								>
									<ListItemText
										primary={n.message}
										secondary={n.type.toUpperCase()}
									/>
								</ListItem>
							))}
						</List>
					)}
				</Box>
			</Popover>
		</Box>
	);
};

export default NotificationButton;
