// src/components/dashboard/NetProfitLoss.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {Paper, Typography} from "@mui/material";

const NetProfitLoss = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);

	// Filter transactions for the current user
	const userTransactions = user ? transactions.filter((txn) => txn.userId === user.uid) : [];
	const totalIncome = userTransactions
		.filter((txn) => txn.type === "income")
		.reduce((sum, txn) => sum + txn.amount, 0);
	const totalExpense = userTransactions
		.filter((txn) => txn.type === "expense")
		.reduce((sum, txn) => sum + txn.amount, 0);
	const net = totalIncome - totalExpense;

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Net Profit vs Loss
			</Typography>
			<Typography variant="body1">Total Income: ${totalIncome}</Typography>
			<Typography variant="body1">Total Expenses: ${totalExpense}</Typography>
			<Typography variant="body1">
				Net {net >= 0 ? "Profit" : "Loss"}: ${Math.abs(net)}
			</Typography>
		</Paper>
	);
};

export default NetProfitLoss;
