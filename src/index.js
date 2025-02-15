// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AuthProvider} from "./context/AuthContext";
import {NotificationProvider} from "./context/NotificationContext";
import {TransactionProvider} from "./context/TransactionContext";
import {ThemeProvider, createTheme} from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#4caf50", // Green primary color
			contrastText: "#ffffff", // White text on primary background
		},
		secondary: {
			main: "#8bc34a", // Lighter green for secondary elements
			contrastText: "#ffffff",
		},
		background: {
			default: "#e8f5e9", // Whitish background color
			paper: "#ffffff",
		},
		text: {
			primary: "#424242", // Soft dark gray for primary text (default for non-primary backgrounds)
			secondary: "#757575",
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<NotificationProvider>
				<TransactionProvider>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</TransactionProvider>
			</NotificationProvider>
		</AuthProvider>
	</React.StrictMode>
);

reportWebVitals();
