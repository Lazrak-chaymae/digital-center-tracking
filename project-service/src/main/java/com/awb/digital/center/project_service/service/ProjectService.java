package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.entity.CustomPhase;
import com.awb.digital.center.project_service.entity.KpiPilotage;
import com.awb.digital.center.project_service.entity.RemarkOrRisk;
import com.awb.digital.center.project_service.entity.Squad;


import java.time.LocalDate;
import java.util.ArrayList;
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
    void updateProjectSquad(SquadDto squadDto, Long projectId);
    void updateProjectName(String name, Long projectId);
    void updateProjectOwner(String owner, Long projectId);
    void updateProjectStartDate(String startDate, Long projectId);
    void updateProjectExpectedDate(String expectedEndDate, Long projectId);
    void updateProjectType(String type, Long projectId);
    void updateProjectDescription(String description, Long projectId);
    void updateProjectAllocatedSprintCount(Integer allocatedSprintCount, Long projectId);
    void updateProjectConsumedSprintCount(Integer consumedSprintCount, Long projectId);
    void updateProjectCompletionPercentage(String ccompletionPercentage, Long projectId);
    void updateProjectActualMepDate(String actualMepDate, Long projectId);
    void updateProjectLastPhaseDate(String lastPhaseDate, Long projectId);
    void updateProjectMilestone(String milestone, Integer index, Long projectId);
    void updateProjectUpcomingRealization(String realization, Integer index, Long projectId);

}
