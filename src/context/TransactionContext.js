// src/context/TransactionContext.js
import React, {createContext, useState, useEffect} from "react";
import {db} from "../firebase";
import {collection, getDocs, addDoc, query, orderBy} from "firebase/firestore";

export const TransactionContext = createContext();

export const TransactionProvider = ({children}) => {
	const [transactions, setTransactions] = useState([]);

	// Function to fetch transactions from Firestore, ordered by date (descending)
	const fetchTransactions = async () => {
		try {
			const q = query(collection(db, "transactions"), orderBy("date", "desc"));
			const querySnapshot = await getDocs(q);
			const trans = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTransactions(trans);
		} catch (error) {
			console.error("Error fetching transactions: ", error);
		}
	};

	// Function to add a new transaction to Firestore
	const addTransaction = async (txn) => {
		try {
			const docRef = await addDoc(collection(db, "transactions"), txn);
			setTransactions((prev) => [{id: docRef.id, ...txn}, ...prev]);
		} catch (error) {
			console.error("Error adding transaction: ", error);
		}
	};

	// Fetch transactions on component mount
	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<TransactionContext.Provider value={{transactions, addTransaction}}>
			{children}
		</TransactionContext.Provider>
	);
};
