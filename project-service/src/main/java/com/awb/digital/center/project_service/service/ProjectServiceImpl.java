package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.InLaunchProjectDto;
import com.awb.digital.center.project_service.dto.ProjectCreationDto;
import com.awb.digital.center.project_service.dto.ProjectDto;
import com.awb.digital.center.project_service.dto.UnderConstructionProjectDto;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository repository;
    private ModelMapper mapper;


    @Override
    public List<UnderConstructionProjectDto> getAllUnderConstructionProject(String statut, Long SquadId) {
        List<Project> projects = repository.findAllByStatusAndSquad(statut, SquadId);
        return projects.stream()
                .map((project -> mapper.map(project, UnderConstructionProjectDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public List<InLaunchProjectDto> getAllInLaunchProject(String statut, Long SquadId) {
        List<Project> projects = repository.findAllByStatusAndSquad(statut, SquadId);
        return projects.stream()
                .map((project -> mapper.map(project, InLaunchProjectDto.class)))
                .collect(Collectors.toList());
    }


    @Override
    public ProjectDto getProjectById(Long id) {
        Project todo =  repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));
        return mapper.map(todo, ProjectDto.class);

    }

    @Override
    public ProjectCreationDto createProject(ProjectCreationDto projectDto) {
        Project createdproject = mapper.map(projectDto, Project.class);
        Project savedProject = repository.save(createdproject);
        return mapper.map(savedProject, ProjectCreationDto.class);

    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));

        project.setName(projectDto.getName());
        project.setOwner(projectDto.getOwner());
        project.setStartDate(projectDto.getStartDate());
        project.setExpectedEndDate(projectDto.getExpectedEndDate());
        project.setPhase(projectDto.getPhase());
        project.setType(projectDto.getType());
        project.setBudget(projectDto.getBudget());
        project.setConsumed(projectDto.getConsumedBudget());
        project.setProgress(projectDto.getProgress());
        project.setDescription(projectDto.getDescription());
        project.setStatus(projectDto.getStatus());
        project.setAllocatedSprintCount(projectDto.getAllocatedSprintCount());
        project.setConsumedSprintCount(projectDto.getConsumedSprintCount());
        project.setCompletionPercentage(projectDto.getCompletionPercentage());
        project.setSquad(projectDto.getSquad());
        project.setPilotageKpis(projectDto.getPilotageKpis());
        project.setPhases(projectDto.getPhases());
        project.setRemarks(projectDto.getRemarks());
        project.setMilestones(projectDto.getMilestones());
        project.setUpcomingRealizations(projectDto.getUpcomingRealizations());

        Project savedProject = repository.save(project);
        return mapper.map(savedProject, ProjectDto.class);
    }

    @Override
    public InLaunchProjectDto updateInLaunchProject(Long id, InLaunchProjectDto projectDto) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));

        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setActualMepDate(projectDto.getActualMepDate());
        project.setLastPhaseDate(projectDto.getLastPhaseDate());
        project.setPhase(projectDto.getPhase());
        project.setKpis(projectDto.getKpis());
        project.setRemarks(projectDto.getRemarks());
        project.setType(projectDto.getType());
        project.setStatus(projectDto.getStatus());

        Project savedProject = repository.save(project);
        return mapper.map(savedProject, InLaunchProjectDto.class);
    }

    @Override
    public UnderConstructionProjectDto updateUnderConstructionProject(Long id, UnderConstructionProjectDto projectDto) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));

        project.setName(projectDto.getName());
        project.setDescription(projectDto.getDescription());
        project.setStartDate(projectDto.getStartDate());
        project.setBudget(projectDto.getBudget());
        project.setConsumed(projectDto.getConsumed());
        project.setPhase(projectDto.getPhase());
        project.setMilestones(projectDto.getMilestones());
        project.setUpcomingRealizations(projectDto.getUpcomingRealizations());
        project.setType(projectDto.getType());
        project.setRemarks(projectDto.getRemarks());
        project.setProgress(projectDto.getProgress());
        project.setSquad(projectDto.getSquad());
        project.setStatus(projectDto.getStatus());

        Project savedProject = repository.save(project);
        return mapper.map(savedProject, UnderConstructionProjectDto.class);
    }
}
