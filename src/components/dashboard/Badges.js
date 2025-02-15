// src/components/dashboard/Badges.js
import React from "react";
import {Paper, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";

const Badges = () => {
	// Dummy badges data
	const badges = [
		{id: 1, title: "Savings Pro", description: "Saved over $1000"},
		{id: 2, title: "Spending Saver", description: "Spent less than $500"},
	];

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				User Badges
			</Typography>
			<List>
				{badges.map((badge, index) => (
					<React.Fragment key={badge.id}>
						<ListItem>
							<ListItemText primary={badge.title} secondary={badge.description} />
						</ListItem>
						{index < badges.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</List>
		</Paper>
	);
};

export default Badges;
