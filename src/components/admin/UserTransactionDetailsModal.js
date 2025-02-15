// src/components/admin/UserTransactionDetailsModal.js
import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
	Typography,
} from "@mui/material";

const UserTransactionDetailsModal = ({open, onClose, transactions, user}) => {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>
				{user ? `Transactions for ${user.name}` : "Transaction Details"}
			</DialogTitle>
			<DialogContent dividers>
				{transactions.length === 0 ? (
					<Typography variant="body1">No transactions found.</Typography>
				) : (
					<List>
						{transactions.map((txn, index) => (
							<React.Fragment key={txn.id}>
								<ListItem alignItems="flex-start">
									<ListItemText
										primary={`${txn.date} - ${txn.category}`}
										secondary={
											<>
												<Typography variant="body2" color="text.primary">
													Amount: ${txn.amount} | Status: {txn.status}
												</Typography>
												<Typography variant="body2" color="text.secondary">
													IP: {txn.ip}
												</Typography>
											</>
										}
									/>
								</ListItem>
								{index < transactions.length - 1 && <Divider component="li" />}
							</React.Fragment>
						))}
					</List>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="contained" color="primary">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UserTransactionDetailsModal;
