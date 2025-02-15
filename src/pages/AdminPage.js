// src/pages/AdminPage.js
import React from "react";
import AdminUserList from "../components/admin/AdminUserList";
import AdminRevenueOverview from "../components/admin/AdminRevenueOverview";
import {Container, Typography} from "@mui/material";

const AdminPage = () => {
	return (
		<Container sx={{padding: 2}}>
			<Typography variant="h4" gutterBottom>
				Admin Dashboard
			</Typography>
			<AdminRevenueOverview />
			<AdminUserList />
		</Container>
	);
};

export default AdminPage;
