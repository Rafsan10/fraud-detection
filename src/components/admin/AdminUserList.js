// src/components/admin/AdminUserList.js
import React, {useState, useEffect, useContext} from "react";
import {db} from "../../firebase";
import {collection, getDocs, updateDoc, doc} from "firebase/firestore";
import {TransactionContext} from "../../context/TransactionContext";
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
import UserTransactionDetailsModal from "./UserTransactionDetailsModal";

const AdminUserList = () => {
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const {transactions} = useContext(TransactionContext);

	// Fetch all user documents from the "users" collection
	const fetchUsers = async () => {
		try {
			const snapshot = await getDocs(collection(db, "users"));
			const fetchedUsers = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUsers(fetchedUsers);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	// Ban a user by updating their status in Firestore to "banned"
	const handleBanUser = async (userId) => {
		try {
			const userDocRef = doc(db, "users", userId);
			await updateDoc(userDocRef, {status: "banned"});
			setUsers((prevUsers) =>
				prevUsers.map((user) => (user.id === userId ? {...user, status: "banned"} : user))
			);
		} catch (error) {
			console.error("Error banning user:", error);
		}
	};

	// When "Inspect" is clicked, store the selected user and open the modal
	const handleInspectUser = (user) => {
		setSelectedUser(user);
		setModalOpen(true);
	};

	// Filter out admin users from the list
	const nonAdminUsers = users.filter((user) => user.role !== "admin");

	// Return the number of transactions for a given user
	const getUserTxnCount = (uid) => {
		return transactions.filter((txn) => txn.userId === uid).length;
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
								<TableCell>Status</TableCell>
								<TableCell>Txn Count</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{nonAdminUsers.map((user) => (
								<TableRow key={user.id}>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.displayName || user.email}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.status || "active"}</TableCell>
									<TableCell>{getUserTxnCount(user.uid)}</TableCell>
									<TableCell>
										{user.status !== "banned" && (
											<Button
												variant="contained"
												color="error"
												onClick={() => handleBanUser(user.id)}
												sx={{mr: 1}}
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

			{/* Modal to display the selected user's transaction details */}
			{selectedUser && (
				<UserTransactionDetailsModal
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					transactions={transactions.filter((txn) => txn.userId === selectedUser.uid)}
					user={selectedUser}
				/>
			)}
		</>
	);
};

export default AdminUserList;
