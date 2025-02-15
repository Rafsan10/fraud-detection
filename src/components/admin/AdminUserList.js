// src/components/admin/AdminUserList.js
import React, {useState, useContext} from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Typography,
} from "@mui/material";
import dummyData from "../../assets/dummyData.json";
import {TransactionContext} from "../../context/TransactionContext";
import UserTransactionDetailsModal from "./UserTransactionDetailsModal";

const AdminUserList = () => {
	const [users, setUsers] = useState(dummyData.users);
	const {transactions} = useContext(TransactionContext);

	// State to manage modal visibility and selected user
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const handleBanUser = (id) => {
		setUsers(users.map((user) => (user.id === id ? {...user, status: "banned"} : user)));
	};

	const handleInspectUser = (user) => {
		setSelectedUser(user);
		setModalOpen(true);
	};

	// Helper functions for spending and txn count
	const getUserSpending = (userId) => {
		const userTxns = transactions.filter((txn) => txn.userId === userId);
		return userTxns.reduce((sum, txn) => sum + txn.amount, 0);
	};

	const getUserTxnCount = (userId) => {
		return transactions.filter((txn) => txn.userId === userId).length;
	};

	// Filter transactions for a given user (for the modal)
	const getTransactionsForUser = (userId) => {
		return transactions.filter((txn) => txn.userId === userId);
	};

	return (
		<>
			<Paper sx={{padding: 2, marginY: 2}}>
				<Typography variant="h6" gutterBottom>
					User List
				</Typography>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>User ID</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>IP Address</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Txn Count</TableCell>
								<TableCell>Total Spending</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.name}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.ip}</TableCell>
									<TableCell>{user.status}</TableCell>
									<TableCell>{getUserTxnCount(user.id)}</TableCell>
									<TableCell>${getUserSpending(user.id)}</TableCell>
									<TableCell>
										{user.status !== "banned" && (
											<Button
												variant="contained"
												color="error"
												onClick={() => handleBanUser(user.id)}
												sx={{marginRight: 1}}
											>
												Ban User
											</Button>
										)}
										<Button
											variant="contained"
											color="primary"
											onClick={() => handleInspectUser(user)}
										>
											Inspect
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

			{/* Modal to display user transaction details */}
			{selectedUser && (
				<UserTransactionDetailsModal
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					transactions={getTransactionsForUser(selectedUser.id)}
					user={selectedUser}
				/>
			)}
		</>
	);
};

export default AdminUserList;
