package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.TaskDto;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.entity.Task;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService{

    private ProjectRepository projectRepository;
    private TaskRepository taskRepository;
    private ModelMapper mapper;

    @Override
    public List<TaskDto> getAllTasks(Long etapeId, Long projectId) {
        List<Task> tasks =   taskRepository.findByEtapeIdAndProjectId(etapeId,projectId);
        return tasks.stream()
                .map((task -> mapper.map(task, TaskDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = mapper.map(taskDto, Task.class);
        Project project = projectRepository.findById(taskDto.getProject().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + taskDto.getProject().getId()));
        task.setProject(project);
        Task createdTask = taskRepository.save(task);
        return mapper.map(createdTask, TaskDto.class);
    }

    @Override
    public TaskDto updateTask(TaskDto taskDto, Long id) {
        Task task =  taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        task.setName(taskDto.getName());
        task.setProgress(taskDto.getProgress());
        taskRepository.save(task);
        return mapper.map(task, TaskDto.class);
    }

    @Override
    public void deleteTask(Long id) {
        Task task =  taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        taskRepository.delete(task);
    }
}
