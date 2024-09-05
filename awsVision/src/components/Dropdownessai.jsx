import React, { useEffect, useState } from "react";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import { updatePhase } from "../services/Project";
import { getAllPhases, addPhases } from "../services/Phase";
const { useToken } = theme;

const Dropdownessai = ({ projectId, refresh , upPhase}) => {
  const [phases, setPhases] = useState([]);
  const [addPhase, setAddPhase] = useState(false);
  const [createdPhase, setCreatedPhase] = useState("");
  const domainId = sessionStorage.getItem("domainId");
  const [projectPhase, setProjectPhase] = useState(upPhase);
  
 
 const getPhases = () => {
    getAllPhases(domainId)
      .then((response) => {
        console.log(response.data);
        setPhases(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createPhase = () => {
    console.log("adding phase with domain : " + domainId)
    const phase = { name: createdPhase, domainId: domainId };
    addPhases(phase)
      .then((response) => {
        console.log(response.data);
        setAddPhase(false);
        setCreatedPhase("");
        getPhases();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getPhases();
  }, []);
  const handleAddPhase = () => {
    setAddPhase(true);
    console.log(addPhase);
  };
  const handleCreatePhase = () => {
    console.log(createdPhase);
    if(createdPhase){
    createPhase();
    }
  };
  const handlePhaseChoose = (phaseId, domain, phaseName) => {
    const phase = { id: phaseId, domainId: domain, name: phaseName };
    updatePhase(phase, projectId)
      .then((response) => {
        console.log(response.data);
        setProjectPhase(phase);
        refresh();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };
  const buttonStyle = {
    weight: 50,
    backgroundColor : "#ec6836",
    color : "white",

  }
  
  return (
    <Dropdown
      menu={{
        items: phases.map((phase) => ({
          key: phase.id,
          label: (
            <button
              key={phase.id}
              style={{backgroundColor: "transparent",}}
              onClick={() =>
                handlePhaseChoose(phase.id, phase.domainId, phase.name)
              }
            >
              {phase.name}
            </button>
          ),
        })),
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <Space split={<Divider type="vertical" 
          style={{borderColor: "rgb(126, 120, 120)",
            height: 160
          }}
          />}>
            <Space
              direction="vertical"
              size="middle"
              style={{
                display: "flex",
                margin: 8,
              }}
            >
              {React.cloneElement(menu, {
                style: menuStyle,
              })}

              <Button type="primary" onClick={handleAddPhase} style={buttonStyle}>
                Ajouter phase
              </Button>
            </Space>
            {addPhase && (
              <Space
                direction="vertical"
                size="middle"
                style={{
                  display: "flex",
                }}
              >
                <input
                  type="text"
                  value={createdPhase}
                  name="createdPhase"
                  onChange={(e) => setCreatedPhase(e.target.value)}
                  placeholder="ajouter une phase"
                />

                <Button type="primary" onClick={handleCreatePhase} style={buttonStyle}>
                  OK
                </Button>
              </Space>
            )}
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
       
      
                
                <Button className="square-button2">{projectPhase ? projectPhase.name : "N/A"}</Button>
               
        
      </a>
    </Dropdown>
  );
};
export default Dropdownessai;
