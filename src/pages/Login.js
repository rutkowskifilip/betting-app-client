import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { updateToken } from "../axios-instance";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userId = Cookies.get("userId");
  useEffect(() => {
    if (userId) {
      navigate("/");
    }
  }, [userId, navigate]);

  const handleUsernameChange = (e) => {
    const newValue = e.target.value.replace(/ /g, "_");
    setUsername(newValue);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", {
        username,
        password,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }

      setMessage("");

      Cookies.set("token", response.data.token, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      });
      updateToken(response.data.token);
      // setUserId(response.data.id);
      Cookies.set("userId", response.data.id, {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      });

      navigate("/");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setMessage(error.response.data);
        }
      } else {
        console.error("There was a problem with your Axios request:", error);
      }
    }
  };

  return (
    <div className="page-login flex-center">
      <div className="form-login flex-center" autoComplete="off">
        <h1>Witaj!</h1>
        <div className="div-text-inputs flex-center">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="text-input"
            placeholder="nazwa użytkownika"
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="text-input"
            placeholder="hasło"
          />
        </div>
        <p style={{ color: "var(--error)" }}>{message}</p>
        <button
          type="submit"
          className="button-submit"
          onClick={handleSubmit}
          onTouchStart={handleSubmit}
          onFocus={handleSubmit}
        >
          Zaloguj
        </button>
      </div>
    </div>
  );
};
