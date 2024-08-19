import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Space, theme } from "antd";
import { updateSquad, listAllSquads } from '../services/Project';
import { updateResponsibleTeam, updateBeneficiaryTeam } from '../services/Dependency';
const { useToken } = theme;


const DropDownAllSquad = ({ dependencyId, refresh , upTeam}) => {
    const [squads, setSquads] = useState([]);
    const [team, setTeam] = useState(upTeam);

    const GetSquads = async () => {
        try {
            const response = await listAllSquads();
            setSquads(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        GetSquads();
    }, [])
    const handleSquadChoose = (squadName) => {
        updateBeneficiaryTeam(dependencyId, squadName)
          .then((response) => {
            console.log(response.data);
            setTeam(squadName);
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
              handleSquadChoose(squad.name)
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
     
              <Button style={{backgroundColor: "transparent", border: "none"}}>{team ? team : "N/A"}</Button>
                 
    </a>
  </Dropdown>
  )
}

export default DropDownAllSquad