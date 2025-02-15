// src/components/dashboard/Badges.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {
	Paper,
	Typography,
	Chip,
	Stack,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
} from "@mui/material";

const Badges = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);
	const [showOthers, setShowOthers] = useState(false);

	// Filter transactions for the current user using user.uid
	const userTransactions = user ? transactions.filter((txn) => txn.userId === user.uid) : [];

	// Calculate aggregated data
	const totalIncome = userTransactions
		.filter((txn) => txn.type === "income")
		.reduce((sum, txn) => sum + txn.amount, 0);
	const totalExpense = userTransactions
		.filter((txn) => txn.type === "expense")
		.reduce((sum, txn) => sum + txn.amount, 0);
	const netSavings = totalIncome - totalExpense;
	const transactionCount = userTransactions.length;

	// Define badge criteria
	const badgeDefinitions = [
		{
			id: 1,
			title: "Savings Pro",
			description: "Net savings of at least $1,000",
			eligible: netSavings >= 1000,
		},
		{
			id: 2,
			title: "Frequent Buyer",
			description: "At least 10 transactions",
			eligible: transactionCount >= 10,
		},
		{
			id: 3,
			title: "Budget Master",
			description: "Total expenses under $500",
			eligible: totalExpense < 500,
		},
		{
			id: 4,
			title: "Big Spender",
			description: "Total expenses of at least $2,000",
			eligible: totalExpense >= 2000,
		},
		{
			id: 5,
			title: "Income Ace",
			description: "Total income of at least $5,000",
			eligible: totalIncome >= 5000,
		},
		{
			id: 6,
			title: "Transaction Rookie",
			description: "At least 1 transaction",
			eligible: transactionCount >= 1,
		},
	];

	// Filter only the owned badges
	const ownedBadges = badgeDefinitions.filter((badge) => badge.eligible);
	// Other badges: those not earned
	const otherBadges = badgeDefinitions.filter((badge) => !badge.eligible);

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Your Badges
			</Typography>
			{userTransactions.length === 0 ? (
				<Typography variant="body1">
					No transactions available to determine badges.
				</Typography>
			) : (
				<>
					<Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
						{ownedBadges.map((badge) => (
							<Chip
								key={badge.id}
								label={badge.title}
								color="success"
								variant="filled"
								sx={{m: 1}}
							/>
						))}
					</Stack>
					<Button
						variant="contained"
						color="primary"
						onClick={() => setShowOthers(!showOthers)}
						sx={{mt: 2}}
					>
						{showOthers ? "Hide Other Badges" : "Show Other Badges"}
					</Button>
					{showOthers && (
						<Stack spacing={2} sx={{mt: 2}}>
							<Typography variant="h6">Other Badges & Criteria</Typography>
							<List>
								{otherBadges.map((badge) => (
									<React.Fragment key={badge.id}>
										<ListItem>
											<ListItemText
												primary={badge.title}
												secondary={badge.description}
											/>
										</ListItem>
										<Divider />
									</React.Fragment>
								))}
							</List>
						</Stack>
					)}
				</>
			)}
		</Paper>
	);
};

export default Badges;
