import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../axios-instance";
export const SetPassword = (params) => {
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { auth } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRepPasswordChange = (e) => {
    setRepPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === repPassword) {
      setPasswordError("");
      try {
        const response = await api.post("/user/setPassword", {
          auth,
          password,
        });
        // console.log(response);
        if (response.status < 200 || response.status >= 300) {
          throw new Error("Network response was not ok");
        }
        // console.log(response);
        alert(response.data);
        navigate("/login");
      } catch (error) {
        console.error("There was a problem with your Axios request:", error);
      }
    } else {
      setPasswordError("Password are not the same");
    }
  };
  return (
    <div className="flex-center page-add-user">
      <div className="form-add-user flex-center">
        <div className="div-text-inputs flex-center">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            on
            className="text-input"
            placeholder="password"
          />

          <input
            type="password"
            id="repPassword"
            value={repPassword}
            onChange={handleRepPasswordChange}
            className="text-input"
            placeholder="repeat password"
          />
          {passwordError && (
            <p style={{ color: "var(--error)" }} className="error-message">
              {passwordError}
            </p>
          )}
        </div>
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};
