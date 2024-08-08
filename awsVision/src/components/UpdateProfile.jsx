import React,{useState, useEffect} from "react";
import { Button, Modal } from "antd";
import { logout } from "../services/AuthService";
import { updatePassword } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true)
    const email = sessionStorage.getItem("authenticatedUser");
    const navigate = useNavigate();
    
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };

    function handleUpdateForm(e) {
        e.preventDefault();
        const updateRequest = {email,oldPassword,newPassword};
        updatePassword(updateRequest).then(
            (response) => { 
                console.log(response.data);
                logout();
                console.log("is log out"); 
                navigate("/login");
             }
        ).catch(
            
            error => { console.error(error)
             }
        )
    }
    useEffect(() => {
        if (newPassword && confirmPassword) {
            setPasswordMatch(newPassword === confirmPassword);
        }
    }, [newPassword, confirmPassword]);
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Modifier mot de passe
      </Button>
      <Modal
        className="text-center"
        title="Modification mot de passe"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
        <div className="row mb-3">
            <label className="col-md-3 control-label">Ancien mot de passe</label>
            <div className="col-md-9">
              <input
                className="form-control"
                type="password"
                name="oldPassword"
                placeholder="Entrer votre mot de passe"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-md-3 control-label">Nouveau mot de passe</label>
            <div className="col-md-9">
              <input
                className="form-control"
                type="password"
                name="newPassword"
                placeholder="Entrer votre mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-md-3 control-label">
              Confirmer nouveau Mot de passe
            </label>
            <div className="col-md-9">
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="Confirmer votre mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {!passwordMatch && (
                <small className="text-danger">
                  Les mots de passe ne correspondent pas
                </small>
              )}
            </div>
          </div>
          <div className="button-container">
          <button className="btn btn-primary" onClick={(e) => handleUpdateForm(e)}>
            Modifier
          </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateProfile;
