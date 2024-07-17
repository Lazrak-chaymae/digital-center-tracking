package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.InLaunchProjectDto;
import com.awb.digital.center.project_service.dto.ProjectCreationDto;
import com.awb.digital.center.project_service.dto.ProjectDto;
import com.awb.digital.center.project_service.dto.UnderConstructionProjectDto;

import java.util.List;

public interface ProjectService {

    List<UnderConstructionProjectDto> getAllUnderConstructionProject(String statut, Long SquadId);
    List<InLaunchProjectDto> getAllInLaunchProject(String statut, Long SquadId);
    ProjectDto getProjectById(Long id);
    ProjectCreationDto createProject(ProjectCreationDto project);
    ProjectDto updateProject(Long id, ProjectDto project);
    InLaunchProjectDto updateInLaunchProject(Long id, InLaunchProjectDto project);
    UnderConstructionProjectDto updateUnderConstructionProject(Long id, UnderConstructionProjectDto project);

}
