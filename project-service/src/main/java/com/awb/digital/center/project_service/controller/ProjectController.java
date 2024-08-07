package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private ProjectService service;


    @GetMapping("/under-construction/status/{status}/squad/{squadId}")
    public ResponseEntity<List<UnderConstructionProjectDto>> getAllUnderConstructionProjects(@PathVariable String status, @PathVariable Long squadId) {
        List<UnderConstructionProjectDto> projects = service.getAllUnderConstructionProject(status, squadId);
        return ResponseEntity.ok(projects);
    }
    @GetMapping("/in-launch/status/{status}/squad/{squadId}")
    public ResponseEntity<List<InLaunchProjectDto>> getAllInLaunchProjects(@PathVariable String status, @PathVariable Long squadId) {
        List<InLaunchProjectDto> projects = service.getAllInLaunchProject(status, squadId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getProjectById(@PathVariable Long id) {
        ProjectDto project = service.getProjectById(id);
        return ResponseEntity.ok(project);
    }
    @GetMapping
    public ResponseEntity<List<ProjectItemDto>> getAllProjects(){
        List<ProjectItemDto> projects = service.getAllProjects();
        return ResponseEntity.ok(projects);
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

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id){
        service.deleteProject(id);
        return ResponseEntity.ok("project deleted successfully");
    }
    @PostMapping("/{id}/milestones")
    public ResponseEntity<String> addMilestoneForProject(@RequestBody MilestoneDto milestone, @PathVariable("id") Long projectId){
        service.addMilestone(milestone, projectId);
        return  new ResponseEntity<>("Milestone added successfully",HttpStatus.CREATED);
    }

    @PostMapping("/{id}/upcomingRealizations")
    public ResponseEntity<String> addUpcomingRealizationForProject(@RequestBody RealizationDto upcomingRealization, @PathVariable("id") Long projectId){
        service.addUpcomingRealization(upcomingRealization, projectId);
        return  new ResponseEntity<>("Realization added successfully",HttpStatus.CREATED);
    }
    @PatchMapping("/{id}/phase")
    public ResponseEntity<String> updateProjectPhase(@RequestBody String newPhase, @PathVariable("id") Long projectId) {
        service.updateProjectPhase(newPhase, projectId);
        return new ResponseEntity<>("Project phase updated successfully", HttpStatus.OK);
    }
}
