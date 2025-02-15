// src/utils/fakeData.js

import dummyData from "../assets/dummyData.json";

// Function to retrieve all users from dummy data
export const getUsers = () => {
	return dummyData.users;
};

// Function to get transactions for a specific user based on userId
export const getTransactionsForUser = (userId) => {
	return dummyData.transactions.filter((txn) => txn.userId === userId);
};

// Function to simulate payment processing for a transaction
export const simulatePayment = (transaction) => {
	const outcomes = ["success", "failure"];
	transaction.status = outcomes[Math.floor(Math.random() * outcomes.length)];
	return transaction;
};
