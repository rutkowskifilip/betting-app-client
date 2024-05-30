import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios-instance";
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setMessage("");
      Cookies.set("token", response.data.token, { expires: 1, secure: true });

      localStorage.setItem("id", response.data.id);
      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(error.response.data);
        }
      } else {
        console.error("There was a problem with your Axios request:", error);
      }
    }
  };

  return (
    <div className="page-login flex-center">
      <form className="form-login flex-center" autoComplete="off">
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
        <p style={{ color: "var(--error)" }}>{message}</p>
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </div>
  );
};
