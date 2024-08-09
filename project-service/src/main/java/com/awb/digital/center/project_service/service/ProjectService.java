package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.*;


import java.util.List;

public interface ProjectService {

    List<UnderConstructionProjectDto> getAllUnderConstructionProject(String status, Long SquadId);
    List<InLaunchProjectDto> getAllInLaunchProject(String status, Long SquadId);
    ProjectDto getProjectById(Long id);
    List<ProjectItemDto> getAllProjects(Integer domainId);
    ProjectCreationDto createProject(ProjectCreationDto project);
    ProjectDto updateProject(Long id, ProjectDto project);
    InLaunchProjectDto updateInLaunchProject(Long id, InLaunchProjectDto project);
    UnderConstructionProjectDto updateUnderConstructionProject(Long id, UnderConstructionProjectDto project);
    void deleteProject(Long id);
    void addMilestone(MilestoneDto milestone, Long projectId);
    void addUpcomingRealization(RealizationDto upcomingRealization, Long projectId);
    void updateProjectPhase(CustomPhaseDto newPhase, Long projectId);
}
