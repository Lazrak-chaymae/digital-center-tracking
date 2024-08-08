import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Space, theme } from "antd";
import { getAllPhases, addPhases, updatePhase } from "../services/Project";

const { useToken } = theme;

const App = () => {
  const [phases, setPhases] = useState([]);
  const [addPhase, setAddPhase] = useState(false);
  const [createdPhase, setCreatedPhase] = useState('');
  const [choosenPhase, setChoosenPhase] = useState('');
  const id= 1;

  
  const getPhases = () => {
    getAllPhases()
      .then((response) => {
        console.log(response.data);
        setPhases(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createPhase = () => {
    addPhases(createdPhase)
      .then((response) => {
        console.log(response.data);
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
  }
  const handleCreatePhase = (e) => {
       setCreatedPhase(e.target.value);
       createPhase();

  }
  const handlePhaseChoose = () => {
       setChoosenPhase(e.target.value);
       updatePhase(choosenPhase,id).then((response) => {
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
      menu={{
        items,
      }}
      dropdownRender={() => (
        <div style={contentStyle}>
          <Space
            style={{
              padding: 8,
            }}
          > 
        
          {phases && phases.map((phase) => {
              <button key={phase.id} onClick={handlePhaseChoose}>{phase.name}</button>
          }}
          </Space>
        
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
                <input type="text" value={createdPhase}
                name="createdPhase" onChange={handleCreatePhase}
                />
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
export default App;
