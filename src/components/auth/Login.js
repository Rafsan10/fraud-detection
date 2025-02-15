// src/components/auth/Login.js
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {
	const {login} = useContext(AuthContext);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const success = login(email, password);
		if (success) {
			navigate("/dashboard");
		} else {
			setError("Invalid credentials. Please try again.");
		}
	};

	return (
		<div style={{maxWidth: "400px", margin: "0 auto", padding: "20px"}}>
			<h2>Login</h2>
			{error && <p style={{color: "red"}}>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div style={{marginBottom: "10px"}}>
					<label>Email:</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						style={{width: "100%", padding: "8px"}}
						required
					/>
				</div>
				<div style={{marginBottom: "10px"}}>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						style={{width: "100%", padding: "8px"}}
						required
					/>
				</div>
				<button type="submit" style={{padding: "10px 20px"}}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
