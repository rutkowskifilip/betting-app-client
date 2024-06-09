import { useState } from "react";
import api from "../axios-instance";
import "../Global.css";
export const AddUser = (params) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (re.test(String(email).toLowerCase())) {
      setMessage("");
    } else {
      setMessage("Błędny adres email");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/add", {
        email,
      });
      if (response.status < 200 || response.status >= 300) {
        throw new Error("Network response was not ok");
      }
      alert(response.data);
      setEmail("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data);
      }
      console.error("There was a problem with your Axios request:", error);
    }
  };
  return (
    <div className="flex-center page-add-user">
      <div className="form-add-user flex-center">
        <div className="div-text-inputs">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            className="text-input"
            placeholder="email"
          />
          {message && <p className="error-message">{message}</p>}
        </div>
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Dodaj
        </button>
      </div>
    </div>
  );
};
