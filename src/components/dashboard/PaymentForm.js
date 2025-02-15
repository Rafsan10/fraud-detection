// src/components/dashboard/PaymentForm.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NotificationContext} from "../../context/NotificationContext";
import {simulatePayment} from "../../utils/fakeData";
import {checkFraud} from "../../utils/fraudDetection"; // Import from fraudDetection.js
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

// Helper function to generate a simulated IP address
const generateRandomIp = () => {
	// Generate a random number between 100 and 200 for the last octet
	const lastOctet = Math.floor(Math.random() * 101) + 100;
	return `192.168.1.${lastOctet}`;
};

const PaymentForm = () => {
	const {user} = useContext(AuthContext);
	const {addNotification} = useContext(NotificationContext);
	const {addTransaction, transactions} = useContext(TransactionContext);

	const [amount, setAmount] = useState("");
	const [txnType, setTxnType] = useState("expense");
	const [categories, setCategories] = useState([
		"Food",
		"Utilities",
		"Entertainment",
		"Transport",
		"General",
	]);
	const [selectedCategory, setSelectedCategory] = useState("General");

	const handlePayment = (e) => {
		e.preventDefault();

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

		// Build the transaction object
		const transaction = {
			id: "txn" + Date.now(), // Local id for reference; Firestore will assign its own id on write
			userId: user.uid, // Using Firebase Auth UID for user identification
			amount: Number(amount),
			category: selectedCategory,
			date: new Date().toISOString(),
			status: "pending",
			ip: user.ip ? user.ip : generateRandomIp(), // Use user.ip if exists, otherwise generate a random IP
			type: txnType,
		};

		// Filter transactions to get the current user's history
		const userTxns = transactions.filter((t) => t.userId === user.uid);

		// Run fraud detection rules using the current transaction, the user, and their transaction history
		if (checkFraud(transaction, user, userTxns)) {
			addNotification("Fraudulent activity detected!", "warning");
		} else {
			addNotification("Payment processed successfully.", "success");
		}

		const processedTransaction = simulatePayment(transaction);
		console.log("Processed Transaction:", processedTransaction);
		addTransaction(processedTransaction);

		// Reset form fields
		setAmount("");
		setTxnType("expense");
		setSelectedCategory("General");
	};

	const handleAddCategory = () => {
		const newCategory = prompt("Enter new category:");
		if (newCategory && newCategory.trim() !== "") {
			if (!categories.includes(newCategory)) {
				setCategories([...categories, newCategory]);
			}
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
