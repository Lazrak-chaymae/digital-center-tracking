import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Space, theme } from "antd";
import { updateSquad, listSquadsByDomain } from '../services/Project';
const { useToken } = theme;


const DropDownSquad = ({ projectId, refresh , upSquad}) => {
    const [squads, setSquads] = useState([]);
    const domainId = sessionStorage.getItem("domainId");
    const [projectSquad, setProjectSquad] = useState(upSquad);

    const GetSquads = async () => {
        try {
            const response = await listSquadsByDomain(domainId);
            setSquads(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        GetSquads();
    }, [])
    const handlePhaseChoose = (squadId, domain, squadName) => {
        const squad = { id: squadId, domainId: domain, name: squadName };
        updateSquad(squad, projectId)
          .then((response) => {
            console.log(response.data);
            setProjectSquad(squad);
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
      
  return (
    <Dropdown
    menu={{
      items: squads.map((squad) => ({
        key: squad.id,
        label: (
          <button
            key={squad.id}
            style={{backgroundColor: "transparent",}}
            onClick={() =>
              handlePhaseChoose(squad.id, squad.domainId, squad.name)
            }
          >
            {squad.name}
          </button>
        ),
      })),
    }}
    dropdownRender={(menu) => (
      <div style={contentStyle}>
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
          </Space>
      </div>
    )}
  >
    <a onClick={(e) => e.preventDefault()}>
     
              <Button className="square-button2">{projectSquad ? projectSquad.name : "N/A"}</Button>
              
      
    </a>
  </Dropdown>
  )
}

export default DropDownSquad