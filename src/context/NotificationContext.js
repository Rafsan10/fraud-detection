// src/context/NotificationContext.js
import React, {createContext, useState} from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
	const [notifications, setNotifications] = useState([]);

	// Add a notification with read set to false by default
	const addNotification = (message, type = "info") => {
		const id = Date.now() + Math.random();
		setNotifications((prev) => [...prev, {id, message, type, read: false}]);
	};

	// Mark a notification as read
	const markAsRead = (id) => {
		setNotifications((prev) => prev.map((n) => (n.id === id ? {...n, read: true} : n)));
	};

	return (
		<NotificationContext.Provider value={{notifications, addNotification, markAsRead}}>
			{children}
		</NotificationContext.Provider>
	);
};
