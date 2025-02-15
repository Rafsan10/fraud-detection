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
import Navbar from "./components/common/Navbar";
import NotificationToast from "./components/common/NotificationToast"; // Import the toast component
import DueBillsNotifier from "./components/admin/DueBillsNotifier";
import AdminRoute from "./components/admin/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<Router>
			<Navbar />
			<NotificationToast /> {/* Toast displays transient notifications */}
			<DueBillsNotifier />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
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
}

export default App;
