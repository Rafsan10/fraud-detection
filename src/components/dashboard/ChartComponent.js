// src/components/dashboard/ChartComponent.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";
import {Paper, Typography} from "@mui/material";

const ChartComponent = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);

	// Filter transactions for the current user and only include expenses
	const userTransactions = user
		? transactions.filter((txn) => txn.userId === user.uid && txn.type === "expense")
		: [];

	// Aggregate expenses by category
	const data = userTransactions.reduce((acc, txn) => {
		const existing = acc.find((item) => item.category === txn.category);
		if (existing) {
			existing.amount += txn.amount;
		} else {
			acc.push({category: txn.category, amount: txn.amount});
		}
		return acc;
	}, []);

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Expenses by Category
			</Typography>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<XAxis dataKey="category" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="amount" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</Paper>
	);
};

export default ChartComponent;
