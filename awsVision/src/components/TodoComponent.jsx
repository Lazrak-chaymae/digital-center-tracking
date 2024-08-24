import React, { useState, useEffect } from 'react'
import AddTodo from './AddTodo'
import { listTodosByDomain, deleteTodo, updateTodoName, updateTodoDeadline, updateTodoDetail, updateTodoStatus, updateTodoResponsible} from '../services/Todo';
import {DeleteOutlined} from '@ant-design/icons'
import { Input } from 'antd';
import DropDownUser from './DropDownUser';


const TodoComponent = () => {
    const domainId = sessionStorage.getItem("domainId");
    const [todos, setTodos] = useState([]);

    const getTodosByDomain = async() => {
        try { 
        const response = await listTodosByDomain(domainId);
        setTodos(response.data);
        }
        catch(error){
            console.error(error);
        }
    }
    const handleTodoDelete = (todoId) => {
        deleteTodo(todoId).then((response) => {
           console.log(response.data);
           getTodosByDomain();
        }).catch((error) => {
            console.error(error);
        })
    }
    const handleUpdate = async(handleFc, todoId, value) => {
        
        try {
          const response = await handleFc(value, todoId);
          console.log(response.data);
        } catch (error) {
          console.error('Error updating Todo informations :', error);
        }
      }
    useEffect(() => {
        getTodosByDomain();
    } ,[todos])
  return (
    <div className="container" style={{ paddingTop: "12px" }}>
    <h3 className="text-center"> Todo </h3>
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nom tache</th>
          <th>Détail</th>
          <th>Deadline</th>
          <th>Statut</th>
          <th>Porteur</th>
          <th>Responsable</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
         {todos && todos.map((todo) => (
            <tr key={todo.id}>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate( updateTodoName, todo.id, e.target.textContent.trim())}
            suppressContentEditableWarning={true}
            >{todo.name}</td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate( updateTodoDetail, todo.id,  e.target.textContent.trim())}
            suppressContentEditableWarning={true}
            >{todo.detail}</td>
            <td>
            <Input type="date" value= {todo.deadline} 
                     style={{width: '115px'}}
                     onChange={(e) => handleUpdate( updateTodoDeadline,  todo.id, e.target.value)}
            />
            </td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate( updateTodoStatus, todo.id, e.target.textContent.trim())}
            suppressContentEditableWarning={true}
            >{todo.status}</td>
            <td>
                <DropDownUser  refresh={getTodosByDomain} todoId={todo.id} todoUser={todo.userName}/>
            </td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdate(updateTodoResponsible, todo.id, e.target.textContent.trim())}
            suppressContentEditableWarning={true}
            >
                {todo.responsible}
            </td>
            <td><DeleteOutlined onClick={() => handleTodoDelete(todo.id)}/></td>
            </tr>
         ))}
      </tbody>
    </table>
      <AddTodo  refreshTodo={getTodosByDomain} domain={domainId}/>
  </div>
  )
}

export default TodoComponent