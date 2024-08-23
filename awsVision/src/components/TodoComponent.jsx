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
    const handleUpdateTodoName = async (todoId, e) => {
  
        const updatedName = e.target.textContent.trim();
        if (updatedName === '') {
          e.target.classList.add('cell-error');
          getTodosByDomain();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateTodoName(todoId, updatedName);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating name:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateTodoDetail = async (todoId, e) => {
  
        const updatedDetail = e.target.textContent.trim();
        if (updatedDetail === '') {
          e.target.classList.add('cell-error');
          getTodosByDomain();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateTodoDetail(todoId, updatedDetail);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Detail:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateTodoDeadline = async (todoId, e) => {
  
        const updatedDeadline = e.target.value;
        if (updatedDeadline === '') {
          e.target.classList.add('cell-error');
          getTodosByDomain();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateTodoDeadline(todoId, updatedDeadline);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating Deadline:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateTodoStatus = async (todoId, e) => {
  
        const updatedStatus = e.target.textContent.trim();
        if (updatedStatus === '') {
          e.target.classList.add('cell-error');
          getTodosByDomain();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateTodoStatus(todoId, updatedStatus);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating status:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
      const handleUpdateTodoResponsible = async (todoId, e) => {
  
        const updateResponsible = e.target.textContent.trim();
        if (updateResponsible === '') {
          e.target.classList.add('cell-error');
          getTodosByDomain();
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
          return; 
        }
        try {
          const response = await updateTodoResponsible(todoId, updateResponsible);
          console.log(response.data);
      
          e.target.classList.add('cell-success');
          setTimeout(() => {
          e.target.classList.remove('cell-success');
          }, 2000);
        } catch (error) {
          console.error('Error updating responsible:', error);
          e.target.classList.add('cell-error');
          setTimeout(() => {
            e.target.classList.remove('cell-error');
          }, 2000);
        }
      };
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
            onBlur={(e) => handleUpdateTodoName(todo.id, e)}
            suppressContentEditableWarning={true}
            >{todo.name}</td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdateTodoDetail(todo.id, e)}
            suppressContentEditableWarning={true}
            >{todo.detail}</td>
            <td>
            <Input type="date" value= {todo.deadline} 
                     style={{width: '115px'}}
                     onChange={(e) => handleUpdateTodoDeadline(todo.id, e)}
            />
            </td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdateTodoStatus(todo.id, e)}
            suppressContentEditableWarning={true}
            >{todo.status}</td>
            <td>
                <DropDownUser  refresh={getTodosByDomain} todoId={todo.id} todoUser={todo.userName}/>
            </td>
            <td
            contentEditable='true' 
            onBlur={(e) => handleUpdateTodoResponsible(todo.id, e)}
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