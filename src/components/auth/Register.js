// src/components/auth/Register.js
import React, {useState} from "react";

const Register = () => {
	// State for name, email, and password
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		// For simulation, log the registration details or set a success message
		console.log("Registered user:", {name, email, password});
		setMessage("Registration successful! (Simulation)");
		// Reset form fields (optional)
		setName("");
		setEmail("");
		setPassword("");
	};

	return (
		<div style={{maxWidth: "400px", margin: "0 auto", padding: "20px"}}>
			<h2>Register</h2>
			{message && <p style={{color: "green"}}>{message}</p>}
			<form onSubmit={handleSubmit}>
				<div style={{marginBottom: "10px"}}>
					<label>Name:</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{width: "100%", padding: "8px"}}
						required
					/>
				</div>
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
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
