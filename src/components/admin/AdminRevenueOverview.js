// src/components/admin/AdminRevenueOverview.js
import React, {useContext} from "react";
import {Paper, Typography} from "@mui/material";
import {TransactionContext} from "../../context/TransactionContext";

const AdminRevenueOverview = () => {
	const {transactions} = useContext(TransactionContext);

	// Calculate total revenue from successful transactions
	const totalRevenue = transactions
		.filter((txn) => txn.status === "success")
		.reduce((sum, txn) => sum + txn.amount, 0);

	// Calculate total loss from failed transactions
	const totalLoss = transactions
		.filter((txn) => txn.status === "failure")
		.reduce((sum, txn) => sum + txn.amount, 0);

	// Compute net profit (could be negative)
	const netProfit = totalRevenue - totalLoss;

	return (
		<Paper sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Revenue & Profit Overview
			</Typography>
			<Typography variant="body1">Total Revenue: ${totalRevenue}</Typography>
			<Typography variant="body1">Total Loss: ${totalLoss}</Typography>
			<Typography variant="body1">Net Profit: ${netProfit}</Typography>
		</Paper>
	);
};

export default AdminRevenueOverview;
