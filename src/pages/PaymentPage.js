// src/pages/PaymentPage.js
import React, {useState, useContext} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Paper, Typography, TextField, Button, Box} from "@mui/material";
import {TransactionContext} from "../context/TransactionContext";
import {simulatePayment} from "../utils/fakeData";
import {NotificationContext} from "../context/NotificationContext";

const PaymentPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const {transaction} = location.state || {}; // preliminary transaction data passed from PaymentForm
	const {addTransaction} = useContext(TransactionContext);
	const {addNotification} = useContext(NotificationContext);

	// Additional fields: credentials (simulate re-entry of password) and target account.
	const [credentials, setCredentials] = useState("");
	const [targetAccount, setTargetAccount] = useState("");
	const [error, setError] = useState("");

	const handleConfirm = (e) => {
		e.preventDefault();

		// Basic validations
		if (!credentials || !targetAccount) {
			setError("Please enter all required details.");
			return;
		}

		// Simulate processing the payment. You can add further logic (e.g., checking credentials).
		// Here, we assume the credentials check passes.
		const finalTransaction = {
			...transaction,
			status: "completed",
			targetAccount, // store target account detail
			processedAt: new Date().toISOString(),
		};

		const processedTransaction = simulatePayment(finalTransaction);
		console.log("Final Processed Transaction:", processedTransaction);
		addTransaction(processedTransaction);
		addNotification("Payment completed successfully.", "success");

		navigate("/dashboard");
	};

	// If no transaction data is passed, redirect back to dashboard
	if (!transaction) {
		navigate("/dashboard");
		return null;
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 2,
			}}
		>
			<Paper elevation={6} sx={{padding: 4, maxWidth: 400, width: "100%"}}>
				<Typography variant="h5" gutterBottom align="center">
					Confirm Payment
				</Typography>
				{error && (
					<Typography variant="body1" color="error" align="center">
						{error}
					</Typography>
				)}
				<Typography variant="body2" align="center" gutterBottom>
					Amount: ${transaction.amount} - {transaction.category}
				</Typography>
				<Box component="form" onSubmit={handleConfirm} noValidate sx={{mt: 2}}>
					<TextField
						label="Enter Credentials"
						type="password"
						value={credentials}
						onChange={(e) => setCredentials(e.target.value)}
						fullWidth
						required
						sx={{mb: 2}}
					/>
					<TextField
						label="Target Account"
						type="text"
						value={targetAccount}
						onChange={(e) => setTargetAccount(e.target.value)}
						fullWidth
						required
						sx={{mb: 2}}
					/>
					<Button type="submit" variant="contained" color="primary" fullWidth>
						Confirm Payment
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default PaymentPage;
