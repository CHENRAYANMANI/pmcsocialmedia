import axios from "axios";
import React, { useState } from "react";
import "./LoginForm.css"; // Your CSS file for styling

const LoginForm = ({ setIsUserLoggedIn, setIsUserSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/token/", {
        grant_type: "password",
        username,
        password,
        // refresh_token: "oZRv8RTmw0uUhoQ6kW3OSdMawMPa8B",
        client_id: "bcRdF0aulayPwsHXEmZLNOEytih0hDTa0PA5jzaY",
        client_secret:
          "uLzeicwldQsDBb7ixY2Njgdl9Y4HaRvFofJ4sps5XjNzisSh5EHpECGIf3Oy9YMsT1R7RnRtd50lRF9z3LBPQm0lSC3JyMVBIP7XejTIRdqUwDbh05xeRQ3Rzb7ygtAh",
      });
      localStorage.setItem("token", response.data["access_token"]);
      // console.log("Login successful:", response.data);
      alert("WELCOME TO PMC SOCIAL MEDIA");
      setIsUserLoggedIn(true);

      // Perform actions after successful login
    } catch (error) {
      alert("PLEASE CHECK PASSWORD AND USERNAME");
      console.error("Login error:", error);

      // Handle login error (display error message, etc.)
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={() => setIsUserSignedUp(false)}>signup</button>
      </form>
    </div>
  );
};

export default LoginForm;
