import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPICall, listRoles, listDomains } from "../services/AuthService";
import validator from "validator";
import "../css/LoginComponent.css";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [roleName, setRoleName] = useState("");
  const [domainName, setDomainName] = useState("");
  const [roles, setRoles] = useState([]);
  const [domains, setDomains] = useState([]);
  const [valideRegister, setValideRegister] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [utilisable, setUtilisable] = useState(false);

  const navigate = useNavigate();

  const getRoles = () => {
    listRoles()
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getDomains = () => {
    listDomains()
      .then((response) => {
        setDomains(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function handleRegistrationForm(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !roleName || !domainName) {
      setValideRegister(false);
      return;
    }

    const register = { name, email, password, roleName, domainName };
    registerAPICall(register)
      .then((response) => {
        console.log(register);
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        console.log(register);
        setUtilisable(true);
      });
  }
  useEffect(() => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{7,})/;

    if (password && confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    }
    if (email !== "" && !validator.isEmail(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if (password !== "" && !passwordRegex.test(password)) {
      setValidPassword(false);
      return;
    } else {
      setValidPassword(true);
    }
  }, [password, confirmPassword, email]);
  useEffect(() => {
    getRoles();
  }, []);
  useEffect(() => {
    getDomains();
  }, []);
  return (
  
    <div className="login-container-2">
    <div className="login-form">
      <h2>Inscription</h2>
      <form>
        <div className="input-group-2">
          <label>Nom</label>
          <input
            type="text"
            name="name"
            placeholder="Entrer votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
     
        <div className="input-group-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
         
        </div>
        {!validEmail && (
            <div className="error-message">** Email non valide **</div>
          )}
        <div className="input-group-2">
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
         
        </div>
        {!validPassword && (
            <div className="error-message">
              ** Le mot de passe doit contenir au moins 7 caractères, une
              lettre majuscule et un caractère spécial **
            </div>
          )}
        <div className="input-group-2">
          <label>Confirmer Mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
         
        </div>
        {!passwordMatch && (
            <div className="error-message">
              ** Les mots de passe ne correspondent pas **
            </div>
          )}
        <div className="input-group-2">
          <label>Poste</label>
          <select
            name="role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          >
            <option value="">Sélectionner votre poste</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        {/* domain */}
        <div className="input-group-2">
          <label>Domaine de travail</label>
          <select
            name="domain"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
          >
            <option value="">Sélectionner votre domaine </option>
            {domains.map((domain) => (
              <option key={domain.id} value={domain.name}>
                {domain.name}
              </option>
            ))}
          </select>
        </div>
        {!valideRegister && (
          <div className="error-message">
            ** Veuillez remplir tous les champs requis **
          </div>
        )}
        {utilisable && (
             <div className="error-message">
             ** Utilisateur déja inscrit avec cet email **
           </div>
        )}
        <div className="button-container">
          <button
            className="login-button"
            onClick={(e) => handleRegistrationForm(e)}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="signup-link">
        <p>
          Vous avez déjà un compte ?{" "}
          <button
            className="btn btn-link"
            onClick={() => navigate("/login")}
          >
            Connectez-vous ici
          </button>
        </p>
      </div>
    </div>
  </div>

  );
};

export default RegisterComponent;
