import React, { useState } from "react";
import api from "../axios-instance";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle the form submission, like sending the username and password to a server for authentication
    console.log("Submitted:", { username, password });

    try {
      const response = await api.post("/user/login", {
        username,
        password,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("There was a problem with your Axios request:", error);
    }
  };

  return (
    <div className="page-login flex-center">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="form-login flex-center"
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
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};
