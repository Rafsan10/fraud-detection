// src/context/NotificationContext.js
import React, {createContext, useState} from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({children}) => {
	const [notifications, setNotifications] = useState([]);

	const addNotification = (message, type = "info") => {
		const id = Date.now() + Math.random(); // ensure a unique id
		setNotifications((prev) => [...prev, {id, message, type}]);
	};

	const removeNotification = (id) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	return (
		<NotificationContext.Provider value={{notifications, addNotification, removeNotification}}>
			{children}
		</NotificationContext.Provider>
	);
};
