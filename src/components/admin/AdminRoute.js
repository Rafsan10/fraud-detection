// src/components/admin/AdminRoute.js
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {db} from "../../firebase";
import {doc, getDoc} from "firebase/firestore";
import {Navigate} from "react-router-dom";
import {CircularProgress, Box} from "@mui/material";

const AdminRoute = ({children}) => {
	const {user} = useContext(AuthContext);
	const [role, setRole] = useState(null);
	const [loading, setLoading] = useState(true);

	// Always call the useEffect hook.
	useEffect(() => {
		const fetchUserRole = async () => {
			try {
				if (user) {
					const userDoc = await getDoc(doc(db, "users", user.uid));
					if (userDoc.exists()) {
						const userData = userDoc.data();
						setRole(userData.role);
					}
				}
			} catch (error) {
				console.error("Error fetching user role:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchUserRole();
	}, [user]);

	if (loading) {
		return (
			<Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
				<CircularProgress />
			</Box>
		);
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (role !== "admin") {
		return <Navigate to="/dashboard" replace />;
	}

	return children;
};

export default AdminRoute;
