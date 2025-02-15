// src/components/dashboard/TransactionHistory.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, List, ListItem, ListItemText, Divider, Typography, Button, Box} from "@mui/material";

const TransactionHistory = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);

	// Filter transactions for the current user using user.uid
	const userTransactions = user ? transactions.filter((txn) => txn.userId === user.uid) : [];

	// Sort transactions by date descending
	const sortedTransactions = [...userTransactions].sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	);

	// Pagination: show 5 transactions initially.
	const [visibleCount, setVisibleCount] = useState(5);

	// Determine whether to show "Show More" or "Hide All"
	const allVisible = visibleCount >= sortedTransactions.length;

	// Button handler: if not all visible, increase visibleCount by 5; if all are visible, reset to 5.
	const handleToggleVisibility = () => {
		if (allVisible) {
			setVisibleCount(5);
		} else {
			setVisibleCount((prev) => prev + 5);
		}
	};

	// Slice the sorted transactions for display
	const visibleTransactions = sortedTransactions.slice(0, visibleCount);

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Transaction History
			</Typography>
			{visibleTransactions.length === 0 ? (
				<Typography variant="body1">No transactions found.</Typography>
			) : (
				<>
					<List>
						{visibleTransactions.map((txn, index) => (
							<React.Fragment key={txn.id}>
								<ListItem>
									<ListItemText
										primary={`${new Date(txn.date).toLocaleString()} - ${
											txn.category
										} (${txn.type})`}
										secondary={`$${txn.amount} - ${txn.status}`}
									/>
								</ListItem>
								{index < visibleTransactions.length - 1 && <Divider />}
							</React.Fragment>
						))}
					</List>
					{sortedTransactions.length > 5 && (
						<Box sx={{display: "flex", justifyContent: "center", mt: 2}}>
							<Button variant="outlined" onClick={handleToggleVisibility}>
								{allVisible ? "Hide All" : "Show More"}
							</Button>
						</Box>
					)}
				</>
			)}
		</Paper>
	);
};

export default TransactionHistory;
