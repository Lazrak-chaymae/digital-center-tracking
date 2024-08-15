import React, { useState } from "react";
import { Button, Modal } from "antd";
import { addRelease } from "../services/Release";

const AddRelease = ({ refreshReleases, domainId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installationDate, setInstallationDate] = useState('');
  const [version, setVersion] = useState('');
  const [type, setType] = useState('');
  const [packages, setPackages] = useState([]);
  const [hotfixContents, setHotfixContents] = useState([]);
  const [evolution, setEvolution] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const releaseData = {
        domainId,
        installationDate,
        version,
        type,
        packages: packages.split(',').map(pkg => pkg.trim()), 
        hotfixContents: hotfixContents.split(',').map(content => content.trim()),
        evolution
    };

try {
    const response = await addRelease(releaseData);
    console.log("Release added successfully:", response.data);
    refreshReleases();
    setIsModalOpen(false);
  } catch (error) {
    console.error("There was an error adding the release:", error);
  }
};
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Ajouter une version
      </Button>
      <Modal
       className="text-center"
        title="Ajouter une version"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <form>
          <div className="form-group mb-2">
            <label className="form-label">Date d'installation :</label>
            <input
              type="date"
              name="installationDate"
              value={installationDate}
              onChange={(e) => setInstallationDate(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Version :</label>
            <input
              type="text"
              placeholder="Entrer la version"
              name="version"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Type:</label>
            <input
              type="text"
              placeholder="Entrer le type (Hotfix / Evolution)"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Packages:</label>
            <input
              type="text"
              placeholder="Entrer les packages séparés par des virgules (,)"
              name="packages"
              value={packages}
              onChange={(e) => setPackages(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Contenu Hotfix:</label>
            <input
              type="text"
              placeholder="Entrer le contenu Hotfix séparés par des virgules (,)"
              name="hotfixContents"
              value={hotfixContents}
              onChange={(e) => setHotfixContents(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="form-group mb-2">
            <label className="form-label">Contenu Evolution:</label>
            <input
              type="text"
              placeholder="Entrer le contenu evolution"
              name="evolution"
              value={evolution}
              onChange={(e) => setEvolution(e.target.value)}
              className={`form-control`}
            ></input>
          </div>
          <div className="button-container">
          <button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
            Ajouter
          </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddRelease;
