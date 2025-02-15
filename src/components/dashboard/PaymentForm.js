// src/components/dashboard/PaymentForm.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NotificationContext} from "../../context/NotificationContext";
import {simulatePayment} from "../../utils/fakeData";
import {checkFraud} from "../../utils/fraudDetection"; // Corrected import
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

		// Use user.uid and fallback for ip field.
		const transaction = {
			id: "txn" + Date.now(), // local id for reference (Firestore will assign its own document id)
			userId: user.uid, // using Firebase Auth UID
			amount: Number(amount),
			category: selectedCategory,
			date: new Date().toISOString(),
			status: "pending",
			ip: user.ip || "unknown", // fallback if undefined
			type: txnType,
		};

		const processedTransaction = simulatePayment(transaction);

		if (checkFraud(processedTransaction, user)) {
			addNotification("Fraudulent activity detected!", "warning");
		} else {
			addNotification("Payment processed successfully.", "success");
		}

		console.log("Processed Transaction:", processedTransaction);
		addTransaction(processedTransaction);

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
