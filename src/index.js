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
			main: "#1976d2",
		},
		secondary: {
			main: "#dc004e",
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
