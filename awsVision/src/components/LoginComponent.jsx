import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginAPICall,
  saveLoggedInUser,
  storeToken,
} from "../services/AuthService";

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
        storeToken(token);
        saveLoggedInUser(email, role, password, name);
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
    <div className="container">
      <br />

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Se connecter</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Email</label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Entrer votre email"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                    ></input>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-3 control-label">Mot de passe</label>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Entrer votre mot de passe"
                      value={password}
                      onChange={handleInputChange(setPassword)}
                    ></input>
                  </div>
                </div>
                <div className="mt-3">
                  {error && (
                    <small className="text-danger">
                      ** Email ou mot de passe non valide
                    </small>
                  )}
                </div>
                <div className="mt-3">
                {!validateLogin && (
                    <small className="text-danger">
                      ** Veuillez remplir tous les champs requis.
                    </small>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleLoginForm(e)}
                >
                  Submit
                </button>
                <div className="mt-3 text-center">
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
