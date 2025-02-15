// src/components/admin/DueBillsNotifier.js
import React, {useContext, useEffect} from "react";
import {NotificationContext} from "../../context/NotificationContext";
import dummyData from "../../assets/dummyData.json";

const DueBillsNotifier = () => {
	const {addNotification} = useContext(NotificationContext);

	useEffect(() => {
		// Check each due bill and notify if due within the next 24 hours.
		if (dummyData.dueBills && dummyData.dueBills.length > 0) {
			const now = new Date();
			dummyData.dueBills.forEach((bill) => {
				const dueDate = new Date(bill.dueDate);
				// If dueDate is within next 24 hours or already past, trigger a notification.
				if (dueDate.getTime() <= now.getTime() + 24 * 60 * 60 * 1000) {
					addNotification(
						`Due Bill: "${bill.title}" is due on ${dueDate.toLocaleString()}`,
						"info"
					);
				}
			});
		}
	}, [addNotification]);

	return null; // This component doesn't render any UI.
};

export default DueBillsNotifier;
