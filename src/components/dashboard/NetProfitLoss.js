// src/components/dashboard/NetProfitLoss.js
import React, {useContext} from "react";
import {Paper, Typography} from "@mui/material";
import {TransactionContext} from "../../context/TransactionContext";

const NetProfitLoss = () => {
	const {transactions} = useContext(TransactionContext);

	// Calculate total income and total expenses based on transaction type.
	const totalIncome = transactions
		.filter((txn) => txn.type === "income")
		.reduce((sum, txn) => sum + txn.amount, 0);

	const totalExpense = transactions
		.filter((txn) => txn.type === "expense")
		.reduce((sum, txn) => sum + txn.amount, 0);

	// Net profit is income minus expense.
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
