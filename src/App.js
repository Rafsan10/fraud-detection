// src/App.js
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import pages and components
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

// Global components
import Navbar from "./components/common/Navbar";
import Notifications from "./components/common/Notifications";
import DueBillsNotifier from "./components/admin/DueBillsNotifier";

function App() {
	return (
		<Router>
			{/* Navbar is displayed on every page */}
			<Navbar />
			{/* Global notification display (if you want a separate area for notifications) */}
			<Notifications />
			{/* Due bills notifier triggers bill-related notifications */}
			<DueBillsNotifier />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/admin" element={<AdminPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
