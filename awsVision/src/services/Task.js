import axios from "axios";


export const addTask = (task) => axios.post('http://localhost:8765/api/tasks', task);
export const listTasks = (projectId, etapeId) => axios.get('http://localhost:8765/api/tasks/project/' + projectId + '/etape/' + etapeId)

export const updateTaskName = (taskId, name) => axios.patch('http://localhost:8765/api/tasks' + '/' + taskId + '/name', name,{
    headers: {
      "Content-Type": "text/plain",
    },
  });
export const updateTaskProgress = (taskId, progress) => axios.patch('http://localhost:8765/api/tasks' + '/' + taskId +'/progress', progress,{
    headers: {
      "Content-Type": "text/plain",
    },
  });


