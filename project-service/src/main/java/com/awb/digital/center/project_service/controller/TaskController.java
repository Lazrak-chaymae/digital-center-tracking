package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.EtapeDto;
import com.awb.digital.center.project_service.dto.SquadDto;
import com.awb.digital.center.project_service.dto.TaskDto;
import com.awb.digital.center.project_service.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/tasks")
@RestController
public class TaskController {

    private TaskService service;

    @GetMapping("/project/{projectId}/etape/{etapeId}")
    public ResponseEntity<List<TaskDto>> getAllTasks(@PathVariable("etapeId") Long etapeId, @PathVariable("projectId") Long projectId ){
        List<TaskDto> tasks = service.getAllTasks(etapeId, projectId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<TaskDto> addTask(@RequestBody TaskDto taskDto) {
        TaskDto task = service.createTask(taskDto);
        return ResponseEntity.ok(task);
    }
    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto taskDto, @PathVariable Long id ){
        TaskDto updatedTask = service.updateTask(taskDto, id);
        return new ResponseEntity<>(updatedTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id){
        service.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully !.");
    }
    @PatchMapping("/{id}/name")
    public ResponseEntity<String> updateTaskName(@PathVariable Long id, @RequestBody String name){
        service.updateTaskName(id, name);
        return ResponseEntity.ok("Task name updated successfully !.");
    }
    @PatchMapping("/{id}/progress")
    public ResponseEntity<String> updateTaskProgress(@PathVariable Long id, @RequestBody String progress){
        service.updateTaskProgress(id, progress);
        return ResponseEntity.ok("Task progress updated successfully !.");
    }
}
