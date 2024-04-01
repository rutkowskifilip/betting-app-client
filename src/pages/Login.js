import React, { useState } from "react";
import "./css/Login.css";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, like sending the username and password to a server for authentication
    console.log("Submitted:", { username, password });
  };

  return (
    <div className="login-page flex-center">
      <form
        onSubmit={handleSubmit}
        className="login-form flex-center"
        autoComplete="off"
      >
        <h1>Welcome!</h1>
        <div className="div-text-inputs flex-center">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="text-input"
            placeholder="login"
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="text-input"
            placeholder="password"
          />
        </div>
        <button type="submit" className="button-submit">
          Login
        </button>
      </form>
    </div>
  );
};
