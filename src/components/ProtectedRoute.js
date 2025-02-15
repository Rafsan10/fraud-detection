// src/components/ProtectedRoute.js
import React, {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
	const {user} = useContext(AuthContext);

	// If no user is logged in, redirect to login page
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
