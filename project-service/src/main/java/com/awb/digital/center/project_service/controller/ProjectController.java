package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    @GetMapping("/domain/{id}")
    public ResponseEntity<List<ProjectItemDto>> getAllProjects(@PathVariable("id") Integer domainId){
        List<ProjectItemDto> projects = service.getAllProjects(domainId);
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
    @PatchMapping("/{projectId}/phase")
    public ResponseEntity<String> updateProjectPhase(@RequestBody CustomPhaseDto phase, @PathVariable Long projectId) {
        service.updateProjectPhase(phase, projectId);
        return new ResponseEntity<>("Project phase updated successfully", HttpStatus.OK);
    }
    @PatchMapping("{projectId}/squad")
    public ResponseEntity<String> updateProjectSquad(@RequestBody SquadDto squadDto, @PathVariable Long projectId){
        service.updateProjectSquad(squadDto, projectId);
        return new ResponseEntity<>("Project squad updated successfully", HttpStatus.OK);
    }
    @PatchMapping("/{projectId}/name")
    public ResponseEntity<String> updateProjectName(
            @RequestBody String name, @PathVariable Long projectId) {
        service.updateProjectName(name, projectId);
        return ResponseEntity.ok("Project name updated successfully");
    }

    @PatchMapping("/{projectId}/owner")
    public ResponseEntity<String> updateProjectOwner(
            @RequestBody String owner, @PathVariable Long projectId) {
        service.updateProjectOwner(owner, projectId);
        return ResponseEntity.ok("Project owner updated successfully");
    }

    @PatchMapping("/{projectId}/start-date")
    public ResponseEntity<String> updateProjectStartDate(
            @RequestBody String startDate, @PathVariable Long projectId) {
        service.updateProjectStartDate(startDate, projectId);
        return ResponseEntity.ok("Project Start date updated successfully");
    }

    @PatchMapping("/{projectId}/expected-date")
    public ResponseEntity<String> updateProjectExpectedDate(
            @RequestBody String expectedEndDate, @PathVariable Long projectId) {
        service.updateProjectExpectedDate(expectedEndDate, projectId);
        return ResponseEntity.ok("Project expected date updated successfully");
    }

    @PatchMapping("/{projectId}/type")
    public ResponseEntity<String> updateProjectType(
            @RequestBody String type, @PathVariable Long projectId) {
        service.updateProjectType(type, projectId);
        return ResponseEntity.ok("Project type updated successfully");
    }



    @PatchMapping("/{projectId}/description")
    public ResponseEntity<String> updateProjectDescription(
            @RequestBody String description, @PathVariable Long projectId) {
        service.updateProjectDescription(description, projectId);
        return ResponseEntity.ok("Project description updated successfully");
    }

    @PatchMapping("/{projectId}/allocated-sprint")
    public ResponseEntity<String> updateProjectAllocatedSprintCount(
            @RequestBody Integer allocatedSprintCount, @PathVariable Long projectId) {
        service.updateProjectAllocatedSprintCount(allocatedSprintCount, projectId);
        return ResponseEntity.ok("Project allocated sprint updated successfully");
    }

    @PatchMapping("/{projectId}/consumed-sprint")
    public ResponseEntity<String> updateProjectConsumedSprintCount(
            @RequestBody Integer consumedSprintCount, @PathVariable Long projectId) {
        service.updateProjectConsumedSprintCount(consumedSprintCount, projectId);
        return ResponseEntity.ok("Project consumed sprint updated successfully");
    }

    @PatchMapping("/{projectId}/completion-percentage")
    public ResponseEntity<String> updateProjectCompletionPercentage(
            @RequestBody String completionPercentage, @PathVariable Long projectId) {
        service.updateProjectCompletionPercentage(completionPercentage, projectId);
        return ResponseEntity.ok("Project completion percentage updated successfully");
    }

    @PatchMapping("/{projectId}/actual-mep-date")
    public ResponseEntity<String> updateProjectActualMepDate(
            @RequestBody String actualMepDate, @PathVariable Long projectId) {
        service.updateProjectActualMepDate(actualMepDate, projectId);
        return ResponseEntity.ok("Project actual mep date updated successfully");
    }

    @PatchMapping("/{projectId}/last-phase-date")
    public ResponseEntity<String> updateProjectLastPhaseDate(
            @RequestBody String lastPhaseDate, @PathVariable Long projectId) {
        service.updateProjectLastPhaseDate(lastPhaseDate, projectId);
        return ResponseEntity.ok("Project last phase date updated successfully");
    }
    @PatchMapping("/{projectId}/milestone/{index}")
    public ResponseEntity<String> updateProjectMilestone(
            @RequestBody(required = false) String milestone, @PathVariable Integer index, @PathVariable Long projectId) {
        service.updateProjectMilestone(milestone, index, projectId);
        return ResponseEntity.ok("Project milestone updated successfully");
    }

    @PatchMapping("/{projectId}/realization/{index}")
    public ResponseEntity<String> updateProjectUpcomingRealization(
            @RequestBody(required = false) String realization, @PathVariable Integer index, @PathVariable Long projectId) {
        service.updateProjectUpcomingRealization(realization, index, projectId);
        return ResponseEntity.ok("Project realization updated successfully");
    }


}
