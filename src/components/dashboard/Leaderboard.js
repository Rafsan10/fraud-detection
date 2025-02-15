// src/components/dashboard/Leaderboard.js
import React from "react";
import {Paper, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";

const Leaderboard = () => {
	// Dummy leaderboard data for simulation
	const leaderboardData = [
		{id: 1, name: "Alice", score: 95},
		{id: 2, name: "Bob", score: 90},
		{id: 3, name: "Charlie", score: 85},
	];

	return (
		<Paper elevation={3} sx={{padding: 2, marginY: 2}}>
			<Typography variant="h6" gutterBottom>
				Leaderboard (Gamification)
			</Typography>
			<List>
				{leaderboardData.map((user, index) => (
					<React.Fragment key={user.id}>
						<ListItem>
							<ListItemText primary={`${user.name}: ${user.score}`} />
						</ListItem>
						{index < leaderboardData.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</List>
		</Paper>
	);
};

export default Leaderboard;
