// src/components/dashboard/TransactionHistory.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, List, ListItem, ListItemText, Divider, Typography} from "@mui/material";

const TransactionHistory = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);
	const userTransactions = user ? transactions.filter((txn) => txn.userId === user.id) : [];

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Transaction History
			</Typography>
			{userTransactions.length === 0 ? (
				<Typography variant="body1">No transactions found.</Typography>
			) : (
				<List>
					{userTransactions.map((txn, index) => (
						<React.Fragment key={txn.id}>
							<ListItem>
								<ListItemText
									primary={`${txn.date} - ${txn.category}`}
									secondary={`$${txn.amount} - ${txn.status}`}
								/>
							</ListItem>
							{index < userTransactions.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			)}
		</Paper>
	);
};

export default TransactionHistory;
