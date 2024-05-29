import { useEffect, useState } from "react";
import api from "../axios-instance";

export const AddUser = (params) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(String(email).toLowerCase())) {
      setEmailError("");
    } else {
      setEmailError("Invalid email address");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here you can handle the form submission, like sending the username and password to a server for authentication

    try {
      const response = await api.post("/user/add", {
        username,
        email,
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
    <div className="flex-center page-add-user">
      <form action="/" method="post" className="form-add-user flex-center">
        <div className="div-text-inputs flex-center">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            on
            className="text-input"
            placeholder="login"
          />

          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            className="text-input"
            placeholder="email"
          />
          {emailError && (
            <p style={{ color: "var(--error)" }} className="error-message">
              {emailError}
            </p>
          )}
        </div>
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Add User
        </button>
      </form>
    </div>
  );
};
