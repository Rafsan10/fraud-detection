// src/components/dashboard/UserDashboard.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import ExpenseSummary from "./ExpenseSummary";
import PaymentForm from "./PaymentForm";
import TransactionHistory from "./TransactionHistory";
import FraudAlerts from "./FraudAlerts";
import ChartComponent from "./ChartComponent";
import Leaderboard from "./Leaderboard";
import Badges from "./Badges";
import NetProfitLoss from "./NetProfitLoss";
import {Container, Typography} from "@mui/material";

const UserDashboard = () => {
	const {user} = useContext(AuthContext);

	return (
		<Container sx={{padding: 2}}>
			<Typography variant="h4" gutterBottom>
				User Dashboard
			</Typography>
			{user ? (
				<>
					<Typography variant="body1" gutterBottom>
						Welcome, {user.name}! This is your dashboard.
					</Typography>
					{/* New Net Profit vs Loss component */}
					<NetProfitLoss />
					<ExpenseSummary />
					<PaymentForm />
					<TransactionHistory />
					<FraudAlerts />
					<ChartComponent />
					<Leaderboard />
					<Badges />
				</>
			) : (
				<Typography variant="body1">
					Please log in to see your dashboard information.
				</Typography>
			)}
		</Container>
	);
};

export default UserDashboard;
