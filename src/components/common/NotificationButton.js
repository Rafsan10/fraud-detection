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
	Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {NotificationContext} from "../../context/NotificationContext";

const NotificationButton = () => {
	const {notifications, markAsRead} = useContext(NotificationContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// Count only notifications that are unread
	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<Box>
			<IconButton color="inherit" onClick={handleClick}>
				<Badge badgeContent={unreadCount} color="secondary">
					<NotificationsIcon />
				</Badge>
			</IconButton>
			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{vertical: "bottom", horizontal: "center"}}
				transformOrigin={{vertical: "top", horizontal: "center"}}
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
								<ListItem key={n.id} divider>
									<ListItemText
										primary={n.message}
										secondary={n.type.toUpperCase()}
									/>
									<Button
										variant="outlined"
										size="small"
										onClick={() => markAsRead(n.id)}
									>
										Mark as Read
									</Button>
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
