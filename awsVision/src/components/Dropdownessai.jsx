import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import { getAllPhases, addPhases, updatePhase } from "../services/Project";

const { useToken } = theme;

const Dropdownessai = ({projectId}) => {
  const [phases, setPhases] = useState([]);
  const [addPhase, setAddPhase] = useState(false);
  const [createdPhase, setCreatedPhase] = useState('');
  const [choosenPhase, setChoosenPhase] = useState('');
  const [domainId, setDomainId] = useState(1);
  


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
    const phase = { name : createdPhase, domainId : domainId }
    addPhases(phase)
      .then((response) => {
        console.log(response.data);
        setAddPhase(false);
        setCreatedPhase('');
        getPhases();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(()=> {
    getPhases();
  },[])
  const handleAddPhase = () => {
    setAddPhase(true);
    console.log(addPhase);
  }
  const handleCreatePhase = () => {
       console.log(createdPhase);
       createPhase();

  }
  const handlePhaseChoose = (phaseId, phaseName) => {
       const phase = { phaseId,phaseName, domainId}
       setChoosenPhase(phase);
       updatePhase(choosenPhase,projectId).then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };
  return (
    <Dropdown
    menu={{ items: phases.map((phase) => ({
        key: phase.id,
        label: (
          <button  key={phase.id}
            onClick={() => handlePhaseChoose(phase.id, phase.name)}
          >
            {phase.name}
          </button>
        ),
      })) }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
           {React.cloneElement(menu, {
            style: menuStyle,
          })}
        
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          > 
            <Button type="primary" onClick={handleAddPhase}>Ajouter phase</Button>
            {addPhase &&
            <div>
                <h4>adding</h4>
                <input type="text" value={createdPhase}
                name="createdPhase" onChange={(e) => setCreatedPhase(e.target.value)}
                placeholder="ajouter une phase"
                />
                <Button type="primary" onClick={handleCreatePhase}>OK</Button>
            
            </div>
           }
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Hover me
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};
export default Dropdownessai;
