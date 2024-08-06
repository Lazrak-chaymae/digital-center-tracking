import React, { useState, useEffect } from "react";
import UpdateProfile from "./UpdateProfile";

const SettingComponent = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("authenticatedUser");
    const role = sessionStorage.getItem("role");
    const password = sessionStorage.getItem("password");
    const name = sessionStorage.getItem("name");
    
    if (email) {
      setEmail(email);
    }
    if (role) {
      setRoleName(role);
    }
    if (password) {
        setPassword(password);
    }
    if (name) {

        setName(name);
    }

  }, []);
  return (
    <div className="container" style={{ height: "496px" }}>
      <br />
      <div className="row">
        <div className="col-md-6 offset-md-3 offset-md-3">
          <div>
            <h2 className="text-center">Profile</h2>
          </div>
          <div>
            <form>
              <div className="row mb-3">
                <label className="col-md-3 control-label">Nom</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-3 control-label">Poste</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="text"
                    name="roleName"
                    value={roleName}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-3 control-label">Email</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    readOnly
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-3 control-label">Mot de passe</label>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
          <UpdateProfile />
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
