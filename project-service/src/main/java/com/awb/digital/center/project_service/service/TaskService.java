package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.TaskDto;

import java.util.List;

public interface TaskService {

      List<TaskDto> getAllTasks(Long etapeId, Long projectId);
      TaskDto  createTask(TaskDto taskDto);
      TaskDto updateTask(TaskDto taskDto, Long id);
      void deleteTask(Long id);

}
