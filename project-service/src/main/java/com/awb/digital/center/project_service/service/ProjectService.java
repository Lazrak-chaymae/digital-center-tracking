package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.entity.Project;

import java.util.List;

public interface ProjectService {

    List<UnderConstructionProjectDto> getAllUnderConstructionProject(String statut, Long SquadId);
    List<InLaunchProjectDto> getAllInLaunchProject(String statut, Long SquadId);
    ProjectDto getProjectById(Long id);
    List<ProjectItemDto> getAllProjects();
    ProjectCreationDto createProject(ProjectCreationDto project);
    ProjectDto updateProject(Long id, ProjectDto project);
    InLaunchProjectDto updateInLaunchProject(Long id, InLaunchProjectDto project);
    UnderConstructionProjectDto updateUnderConstructionProject(Long id, UnderConstructionProjectDto project);
    void deleteProject(Long id);
    void addMilestone(MilestoneDto milestone, Long projectId);
    void addUpcomingRealization(RealizationDto upcomingRealization, Long projectId);
    void updateProjectPhase(CustomPhaseDto newPhase, Long projectId);
}
