// src/App.js
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import pages and components
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
import AdminPage from "./pages/AdminPage";
import PaymentPage from "./pages/PaymentPage"; // Import PaymentPage
import NotFound from "./pages/NotFound";
import Navbar from "./components/common/Navbar";
import NotificationToast from "./components/common/NotificationToast";
import DueBillsNotifier from "./components/admin/DueBillsNotifier";
import AdminRoute from "./components/admin/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<Router>
			<Navbar />
			<NotificationToast />
			<DueBillsNotifier />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/payment"
					element={
						<ProtectedRoute>
							<PaymentPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/admin"
					element={
						<AdminRoute>
							<AdminPage />
						</AdminRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
