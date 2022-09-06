import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();

  const handleAddLocalStorage = () => {
    if (!!user) {
      localStorage.setItem("user", user);
      history("/home");
    } else {
      setErrorMessage("Kullanıcı adı giriniz.");
    }
  };

  return (
    <div className="todo-content">
      <form>
        <input
          type="text"
          placeholder="Kullanıcı Adı Giriniz."
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <div className="multi-button-content">
          <Button
            type="button"
            className="edit-button"
            onClick={handleAddLocalStorage}
            text="Giriş Yap"
          />
        </div>
      </form>
      <small>{errorMessage ? errorMessage : ""}</small>
    </div>
  );
};

export default Login;
