// src/components/dashboard/ExpenseSummary.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, Typography} from "@mui/material";

const ExpenseSummary = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);

	// Filter transactions for the current user and only include expenses
	const userTransactions = user
		? transactions.filter((txn) => txn.userId === user.uid && txn.type === "expense")
		: [];

	const totalExpenses = userTransactions.reduce((sum, txn) => sum + txn.amount, 0);

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Expense Summary
			</Typography>
			<Typography variant="body1">Total Expenses: ${totalExpenses}</Typography>
		</Paper>
	);
};

export default ExpenseSummary;
