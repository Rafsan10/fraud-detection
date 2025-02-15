// src/components/dashboard/PaymentForm.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {NotificationContext} from "../../context/NotificationContext";
// Removed unused TransactionContext import
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
import {useNavigate} from "react-router-dom";

// Helper function to generate a simulated IP address
const generateRandomIp = () => {
	const lastOctet = Math.floor(Math.random() * 101) + 100;
	return `192.168.1.${lastOctet}`;
};

const PaymentForm = () => {
	const {user} = useContext(AuthContext);
	const {addNotification} = useContext(NotificationContext);
	const navigate = useNavigate();

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

		// Build the preliminary transaction object
		const transaction = {
			id: "txn" + Date.now(), // Local id for reference; Firestore will assign its own document id on write
			userId: user.uid,
			amount: Number(amount),
			category: selectedCategory,
			date: new Date().toISOString(),
			status: "pending",
			ip: user.ip ? user.ip : generateRandomIp(),
			type: txnType,
		};

		// Navigate to the PaymentPage with the preliminary transaction data
		navigate("/payment", {state: {transaction}});
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
