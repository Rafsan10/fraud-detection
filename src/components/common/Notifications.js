// src/components/common/Notifications.js
import React, {useContext, useEffect} from "react";
import {NotificationContext} from "../../context/NotificationContext";

const Notifications = () => {
	const {notifications, removeNotification} = useContext(NotificationContext);

	// Automatically dismiss notifications after 3 seconds
	useEffect(() => {
		const timers = notifications.map((notification) =>
			setTimeout(() => {
				removeNotification(notification.id);
			}, 3000)
		);
		return () => {
			timers.forEach((timer) => clearTimeout(timer));
		};
	}, [notifications, removeNotification]);

	return (
		<div style={{position: "fixed", top: 10, right: 10, zIndex: 9999}}>
			{notifications.map((n) => (
				<div
					key={n.id}
					style={{
						margin: "5px",
						padding: "10px",
						backgroundColor:
							n.type === "error"
								? "#f8d7da"
								: n.type === "warning"
								? "#fff3cd"
								: "#d4edda",
						border: "1px solid",
						borderColor:
							n.type === "error"
								? "#f5c6cb"
								: n.type === "warning"
								? "#ffeeba"
								: "#c3e6cb",
						borderRadius: "4px",
					}}
				>
					{n.message}
				</div>
			))}
		</div>
	);
};

export default Notifications;
