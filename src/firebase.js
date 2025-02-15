// src/firebase.js
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";

// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
	apiKey: "AIzaSyADnQVnaOErArNuWNrGeV9YAnBsrGFdWZs",
	authDomain: "fraud-detection-470ad.firebaseapp.com",
	projectId: "fraud-detection-470ad",
	storageBucket: "fraud-detection-470ad.firebasestorage.app",
	messagingSenderId: "113188190892",
	appId: "1:113188190892:web:afc436df0a48cdfc5b3d09",
	measurementId: "G-M981NK456S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional: Only if you need analytics
const db = getFirestore(app);

export {app, db};
