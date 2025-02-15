// src/components/dashboard/FraudAlerts.js
import React, {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {TransactionContext} from "../../context/TransactionContext";
import {checkFraud} from "../../utils/fraudDetection";
import {Paper, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";

const FraudAlerts = () => {
	const {user} = useContext(AuthContext);
	const {transactions} = useContext(TransactionContext);
	const userTransactions = user ? transactions.filter((txn) => txn.userId === user.id) : [];
	const alerts = userTransactions.filter((txn) => checkFraud(txn, user));

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Fraud Alerts
			</Typography>
			{alerts.length === 0 ? (
				<Typography variant="body1">No suspicious transactions.</Typography>
			) : (
				<List>
					{alerts.map((alert, index) => (
						<React.Fragment key={alert.id}>
							<ListItem>
								<ListItemText
									primary={`Suspicious Transaction: $${alert.amount}`}
									secondary={`Date: ${alert.date}`}
								/>
							</ListItem>
							{index < alerts.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			)}
		</Paper>
	);
};

export default FraudAlerts;
