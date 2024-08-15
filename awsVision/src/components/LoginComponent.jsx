import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";
import "../css/LoginComponent.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [validateLogin, setValideLogin] = useState(true);
  const navigate = useNavigate();

  async function handleLoginForm(e) {
    e.preventDefault();
    if (!email || !password) {
      setValideLogin(false);
      return;
    }
    await loginAPICall(email, password)
      .then((response) => {
        console.log(response.data);
        //const token = 'Basic ' + window.btoa(email + ":" + password);
        const token = "Bearer " + response.data.accessToken;
        const role = response.data.role;
        const name = response.data.name;
        const domainId = response.data.domainId;
        const domainName = response.data.domainName;
        storeToken(token);
        saveLoggedInUser(email, role, password, name, domainId, domainName);
        navigate("/home");

        window.location.reload(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (!validateLogin) {
      setValideLogin(true);
    }
  };
  return (
    
    <div className="login-container">
      <div className="login-form">
        <h2>Se connecter</h2>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Entrer votre email"
              value={email}
              onChange={handleInputChange(setEmail)}
            ></input>
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={handleInputChange(setPassword)}
            ></input>
          </div>
          {error && (
            <div className="error-message">
              ** Email ou mot de passe non valide **
            </div>
          )}
          {!validateLogin && (
            <div className="error-message">
              ** Veuillez remplir tous les champs requis **
            </div>
          )}
          <div className="button-container">
            <button className="login-button" onClick={handleLoginForm}>
              Submit
            </button>
          </div>
        </form>
        <div className="signup-link">
          <p>
            Pas encore de compte ?{" "}
            <button
              className="btn btn-link"
              onClick={() => navigate("/register")}
            >
              Inscrivez-vous ici
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
