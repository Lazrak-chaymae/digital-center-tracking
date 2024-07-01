package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.InLaunchProjectDto;
import com.awb.digital.center.project_service.dto.ProjectCreationDto;
import com.awb.digital.center.project_service.dto.ProjectDto;
import com.awb.digital.center.project_service.dto.UnderConstructionProjectDto;
import com.awb.digital.center.project_service.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class Controller {

    private ProjectService service;

    @GetMapping("/status/{status}/squad/{squadId}")
    public ResponseEntity<List<UnderConstructionProjectDto>> getAllUnderConstructionProjects(@PathVariable String status, @PathVariable Long squadId) {
        List<UnderConstructionProjectDto> projects = service.getAllProjectByStatutAndSquad(status, squadId);
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/status/{status}")
    public ResponseEntity<List<UnderConstructionProjectDto>> getAllInLaunchProjects(@PathVariable String status) {
        List<UnderConstructionProjectDto> projects = service.getAllProjectByStatut(status);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        ProjectDto project = service.getProjectById(id);
        return ResponseEntity.ok(project);
    }

    @PostMapping
    public ResponseEntity<ProjectCreationDto> addProject(@RequestBody ProjectCreationDto projectCreationDto) {
        ProjectCreationDto createdProject = service.createProject(projectCreationDto);
        return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectDto> updateProject(@PathVariable Long id, @RequestBody ProjectDto projectDto) {
        ProjectDto updatedProject = service.updateProject(id, projectDto);
        return ResponseEntity.ok(updatedProject);
    }

    @PutMapping("/in-launch/{id}")
    public ResponseEntity<InLaunchProjectDto> updateInLaunchProject(@PathVariable Long id, @RequestBody InLaunchProjectDto projectDto) {
        InLaunchProjectDto updatedProject = service.updateInLaunchProject(id, projectDto);
        return ResponseEntity.ok(updatedProject);
    }

    @PutMapping("/under-construction/{id}")
    public ResponseEntity<UnderConstructionProjectDto> updateUnderConstructionProject(@PathVariable Long id, @RequestBody UnderConstructionProjectDto projectDto) {
        UnderConstructionProjectDto updatedProject = service.updateUnderConstructionProject(id, projectDto);
        return ResponseEntity.ok(updatedProject);
    }
}
