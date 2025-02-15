// src/components/dashboard/ExpenditureRecommendations.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, Typography} from "@mui/material";

const ExpenditureRecommendations = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);

	// Filter transactions for the current user
	const userTransactions = user
		? transactions.filter((txn) => txn.userId === user.uid && txn.type === "expense")
		: [];

	let recommendation = "No recommendations available at this time.";

	if (userTransactions.length > 0) {
		// Compute total expenses and average expense per transaction.
		const totalExpense = userTransactions.reduce((sum, txn) => sum + txn.amount, 0);
		const avgExpense = totalExpense / userTransactions.length;

		// Dummy logic for recommendations:
		if (avgExpense > 1000) {
			recommendation =
				"Your average expense is high. Consider reducing discretionary spending or reviewing subscriptions.";
		} else if (avgExpense < 500) {
			recommendation =
				"Your spending appears controlled. Keep up the good work, and consider saving more!";
		} else {
			recommendation =
				"Your spending is moderate. Consider tracking your expenses to find areas for improvement.";
		}
	}

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Expenditure Recommendations
			</Typography>
			<Typography variant="body1">{recommendation}</Typography>
		</Paper>
	);
};

export default ExpenditureRecommendations;
