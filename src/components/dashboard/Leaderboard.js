// src/components/dashboard/Leaderboard.js
import React, {useState, useEffect, useContext} from "react";
import {db} from "../../firebase";
import {collection, getDocs} from "firebase/firestore";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";

const Leaderboard = () => {
	const {transactions} = useContext(TransactionContext);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const snapshot = await getDocs(collection(db, "users"));
				const usersList = snapshot.docs.map((doc) => ({
					uid: doc.data().uid || doc.id, // Ensure we have a unique UID
					displayName: doc.data().displayName,
					email: doc.data().email,
					role: doc.data().role,
				}));
				setUsers(usersList);
			} catch (error) {
				console.error("Error fetching users for leaderboard:", error);
			}
		};

		fetchUsers();
	}, []);

	// Filter out admin users and compute net savings for each remaining user
	const usersWithSavings = users
		.filter((user) => user.role !== "admin")
		.map((user) => {
			const userTxns = transactions.filter((txn) => txn.userId === user.uid);
			const totalIncome = userTxns
				.filter((txn) => txn.type === "income")
				.reduce((sum, txn) => sum + txn.amount, 0);
			const totalExpense = userTxns
				.filter((txn) => txn.type === "expense")
				.reduce((sum, txn) => sum + txn.amount, 0);
			const netSavings = totalIncome - totalExpense;
			return {...user, netSavings};
		});

	// Sort users by net savings (highest first)
	const sortedUsers = [...usersWithSavings].sort((a, b) => b.netSavings - a.netSavings);

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Leaderboard (Net Savings)
			</Typography>
			{sortedUsers.length === 0 ? (
				<Typography variant="body1">No user data available.</Typography>
			) : (
				<List>
					{sortedUsers.map((user, index) => (
						<React.Fragment key={user.uid}>
							<ListItem>
								<ListItemText
									primary={user.displayName || user.email}
									secondary={`Net Savings: $${user.netSavings}`}
								/>
							</ListItem>
							{index < sortedUsers.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			)}
		</Paper>
	);
};

export default Leaderboard;
