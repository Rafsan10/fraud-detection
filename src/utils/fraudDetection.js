// src/utils/fraudDetection.js

export const checkFraud = (transaction, user) => {
	// Rule 1: Flag if transaction amount exceeds a threshold.
	const threshold = 1000; // Example threshold value
	if (transaction.amount > threshold) {
		return true;
	}
	// Rule 2: Flag if transaction IP doesn't match the user's registered IP.
	if (transaction.ip !== user.ip) {
		return true;
	}
	return false;
};
