package com.awb.digital.center.project_service.service.impl;

import com.awb.digital.center.project_service.dto.TaskDto;
import com.awb.digital.center.project_service.entity.Etape;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.entity.Task;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.EtapeRepository;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.repository.TaskRepository;
import com.awb.digital.center.project_service.service.TaskService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class TaskServiceImpl implements TaskService {

    private ProjectRepository projectRepository;
    private EtapeRepository etapeRepository;
    private TaskRepository taskRepository;
    private ModelMapper mapper;

    @Override
    public List<TaskDto> getAllTasks(Long etapeId, Long projectId) {
        List<Task> tasks =   taskRepository.findByEtapeIdAndProjectId(etapeId,projectId);
        return tasks.stream()
                .map((task -> new TaskDto(
                        task.getId(),
                        task.getName(),
                        task.getProgress(),
                        task.getEtape().getId(),
                        task.getProject().getId()
                )))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {

        Project project = projectRepository.findById(taskDto.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + taskDto.getProjectId()));
        Etape etape = etapeRepository.findById(taskDto.getEtapeId())
                .orElseThrow(() -> new ResourceNotFoundException("Etape not found with id:" + taskDto.getEtapeId()));

        Task task = new Task();
        task.setName(taskDto.getName());
        task.setProgress(taskDto.getProgress());
        task.setProject(project);
        task.setEtape(etape);
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

    @Override
    public void updateTaskName(Long id, String name) {
        Task task =  taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        task.setName(name);
        taskRepository.save(task);

    }

    @Override
    public void updateTaskProgress(Long id, String progress) {
        Task task =  taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id:" + id));
        task.setProgress(progress);
        taskRepository.save(task);
    }
}
