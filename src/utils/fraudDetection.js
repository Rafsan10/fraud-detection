// src/utils/fraudDetection.js

/**
 * Checks if a transaction is potentially fraudulent.
 * @param {Object} txn - The current transaction object.
 * @param {Object} user - The current user object.
 * @param {Array} transactionsHistory - Array of previous transactions for the user.
 *                                      Defaults to an empty array if not provided.
 * @returns {boolean} - True if the transaction is considered suspicious.
 */
export const checkFraud = (txn, user, transactionsHistory = []) => {
	const currentTime = new Date(txn.date).getTime();

	// Rule 1: Flag if 3 or more transactions occur within 10 minutes from different IPs.
	const tenMinutes = 10 * 60 * 1000;
	const recentTxns = transactionsHistory.filter(
		(t) => currentTime - new Date(t.date).getTime() <= tenMinutes
	);
	const uniqueIps = [...new Set(recentTxns.map((t) => t.ip))];
	if (recentTxns.length >= 3 && uniqueIps.length > 1) {
		console.log("Fraud detected: Frequent transactions from different IPs in 10 minutes");
		return true;
	}

	// Rule 2: Flag if 5 or more transactions occur within 5 minutes.
	const fiveMinutes = 5 * 60 * 1000;
	const recentTxnsShort = transactionsHistory.filter(
		(t) => currentTime - new Date(t.date).getTime() <= fiveMinutes
	);
	if (recentTxnsShort.length >= 5) {
		console.log("Fraud detected: Too many transactions in 5 minutes");
		return true;
	}

	// Rule 3: Flag if the current transaction's amount is more than 1.5 times the average of previous transactions.
	const previousTxns = transactionsHistory.filter(
		(t) => new Date(t.date).getTime() < currentTime
	);
	if (previousTxns.length > 0) {
		const avgAmount = previousTxns.reduce((sum, t) => sum + t.amount, 0) / previousTxns.length;
		if (txn.amount > 1.5 * avgAmount) {
			console.log("Fraud detected: Payment amount exceeds 1.5 times the average");
			return true;
		}
	}

	// You can add additional fraud detection rules here

	return false;
};
