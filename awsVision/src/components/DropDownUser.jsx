import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, theme } from "antd";
import { listUsersByDomain } from "../services/UserService";
import { updateTodoUser } from "../services/Todo";
const { useToken } = theme;



const DropDownUser = ({todoId, refresh, todoUser}) => {
    const [users, setUsers] = useState([]);
    const [updatedUser, setUpdatedUser] = useState(todoUser);
    const domainId = sessionStorage.getItem("domainId");

   
    const getUsers = () => {
        listUsersByDomain(domainId).then(
            (response) =>
            {
               setUsers(response.data);
               console.log("users" ,response.data)
            }).catch(
             error =>
            {
              console.error(error);
            }
          )
    }
  
   
    useEffect(() => {
      getUsers();
      console.log(todoUser)
      console.log("up" , updatedUser)
    }, []);
   
    useEffect(() => {
        setUpdatedUser(todoUser || "Select User"); 
      }, [todoUser]);
    const handleUserChoose = (todoId, userName) => {
      
      updateTodoUser(todoId, userName)
        .then((response) => {
          console.log(response.data);
          setUpdatedUser(userName);
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
      weight: 60,
    }
  return (
    <Dropdown
      menu={{
        items: users.map((user) => ({
          key: user.id,
          label: (
            <button
              key={user.id}
              style={{backgroundColor: "transparent",}}
              onClick={() =>
                handleUserChoose(todoId, user.name)
              }
            >
              {user.name}
            </button>
          ),
        })),
      }}
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          <Space>
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
          </Space>
        </div>
      )}
    >
      <a onClick={(e) => e.preventDefault()}>
                <Button className={{backgroundColor: "transparent", border: "none"}}>{updatedUser}</Button>
      </a>
    </Dropdown>
  )
}

export default DropDownUser