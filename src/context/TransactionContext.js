// src/context/TransactionContext.js
import React, {createContext, useState} from "react";
import dummyData from "../assets/dummyData.json";

export const TransactionContext = createContext();

export const TransactionProvider = ({children}) => {
	// Initialize transactions with dummy data from dummyData.json
	const [transactions, setTransactions] = useState(dummyData.transactions);

	// Function to add a new transaction to the list
	const addTransaction = (txn) => {
		setTransactions((prevTransactions) => [txn, ...prevTransactions]);
	};

	return (
		<TransactionContext.Provider value={{transactions, addTransaction}}>
			{children}
		</TransactionContext.Provider>
	);
};
