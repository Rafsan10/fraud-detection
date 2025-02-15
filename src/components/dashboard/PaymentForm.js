// src/components/dashboard/PaymentForm.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NotificationContext} from "../../context/NotificationContext";
import {simulatePayment} from "../../utils/fakeData";
import {checkFraud} from "../../utils/fraudDetection";
import {TransactionContext} from "../../context/TransactionContext";
import {
	TextField,
	Button,
	Paper,
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Stack,
} from "@mui/material";

const PaymentForm = () => {
	const {user} = useContext(AuthContext);
	const {addNotification} = useContext(NotificationContext);
	const {addTransaction} = useContext(TransactionContext);

	const [amount, setAmount] = useState("");
	// State for transaction type (Expense/Income)
	const [txnType, setTxnType] = useState("expense");
	// State for category; initially set to a default list
	const [categories, setCategories] = useState([
		"Food",
		"Utilities",
		"Entertainment",
		"Transport",
		"General",
	]);
	// Selected category value (default is 'General')
	const [selectedCategory, setSelectedCategory] = useState("General");

	const handlePayment = (e) => {
		e.preventDefault();

		// Validate amount
		if (!amount || Number(amount) <= 0) {
			addNotification("Please enter a valid amount.", "error");
			return;
		}
		if (!user) {
			addNotification("Please log in to make a payment.", "error");
			return;
		}
		if (user.status === "banned") {
			addNotification("Your account has been banned. You cannot make transactions.", "error");
			return;
		}

		// Create a new transaction object including transaction type and selected category.
		const transaction = {
			id: "txn" + Date.now(),
			userId: user.id,
			amount: Number(amount),
			category: selectedCategory,
			date: new Date().toISOString(),
			status: "pending",
			ip: user.ip,
			type: txnType,
		};

		// Simulate payment processing.
		const processedTransaction = simulatePayment(transaction);

		// Check for potential fraud.
		if (checkFraud(processedTransaction, user)) {
			addNotification("Fraudulent activity detected!", "warning");
		} else {
			addNotification("Payment processed successfully.", "success");
		}

		console.log("Processed Transaction:", processedTransaction);
		addTransaction(processedTransaction);

		// Reset form fields.
		setAmount("");
		setTxnType("expense");
		setSelectedCategory("General");
	};

	// Handler to add a new category
	const handleAddCategory = () => {
		const newCategory = prompt("Enter new category:");
		if (newCategory && newCategory.trim() !== "") {
			// Avoid duplicate categories
			if (!categories.includes(newCategory)) {
				setCategories([...categories, newCategory]);
			}
			// Set the new category as selected
			setSelectedCategory(newCategory);
		}
	};

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Simulate Payment
			</Typography>
			<Box component="form" onSubmit={handlePayment} noValidate>
				<TextField
					label="Amount"
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					fullWidth
					required
					sx={{marginBottom: 2}}
				/>
				<Stack direction="row" spacing={2} sx={{marginBottom: 2}}>
					<FormControl fullWidth>
						<InputLabel id="txn-type-label">Transaction Type</InputLabel>
						<Select
							labelId="txn-type-label"
							id="txn-type-select"
							value={txnType}
							label="Transaction Type"
							onChange={(e) => setTxnType(e.target.value)}
						>
							<MenuItem value="expense">Expense</MenuItem>
							<MenuItem value="income">Income</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="category-label">Category</InputLabel>
						<Select
							labelId="category-label"
							id="category-select"
							value={selectedCategory}
							label="Category"
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							{categories.map((cat) => (
								<MenuItem key={cat} value={cat}>
									{cat}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button variant="outlined" color="secondary" onClick={handleAddCategory}>
						Add Category
					</Button>
				</Stack>
				<Button type="submit" variant="contained" color="primary">
					Make Payment
				</Button>
			</Box>
		</Paper>
	);
};

export default PaymentForm;
