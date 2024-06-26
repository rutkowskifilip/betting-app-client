import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { updateToken } from "../axios-instance";
import Cookies from "js-cookie";
export const SetPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [message, setMessage] = useState("");

  const { auth } = useParams();
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    const newValue = e.target.value.replace(/ /g, "_");
    setUsername(newValue);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepPasswordChange = (e) => {
    setRepPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      if (password === repPassword) {
        setMessage("");
        try {
          const response = await api.post("/user/setPassword", {
            auth,
            username,
            password,
          });

          if (response.status < 200 || response.status >= 300) {
            throw new Error("Network response was not ok");
          }

          alert(response.data);
          Cookies.remove("userId");
          Cookies.remove("token");
          updateToken("");
          navigate("/login");
        } catch (error) {
          if (error.response.status === 409) {
            setMessage(error.response.data);
          }

          console.error("There was a problem with your Axios request:", error);
        }
      } else {
        setMessage("Wprowadzone hasła nie są takie same");
      }
    } else {
      setMessage("Hasło musi mieć co najmniej 8 znaków");
    }
  };
  return (
    <div className="flex-center page-add-user">
      <div className="form-add-user flex-center">
        <div className="div-text-inputs flex-center">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            on
            className="text-input"
            placeholder="nazwa użytkownika"
          />

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            on
            className="text-input"
            placeholder="hasło"
          />

          <input
            type="password"
            id="repPassword"
            value={repPassword}
            onChange={handleRepPasswordChange}
            className="text-input"
            placeholder="powtórz hasło"
          />
          {message && <p className="error-message">{message}</p>}
        </div>
        <button
          type="submit"
          className="button-submit"
          onClick={handleSubmit}
          disabled={username === "" || password === "" || repPassword === ""}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};
