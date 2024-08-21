package com.awb.digital.center.project_service.service.impl;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.entity.*;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.CustomPhaseRepository;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.repository.SquadRepository;
import com.awb.digital.center.project_service.service.ProjectService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository repository;
    private CustomPhaseRepository customPhaseRepository;
    private SquadRepository squadRepository;
    private ModelMapper mapper;


    @Override
    public List<UnderConstructionProjectDto> getAllUnderConstructionProject(String status, Long SquadId) {
        List<Project> projects = repository.findAllByStatusAndSquad(status, SquadId);
        return projects.stream()
                .map((project -> mapper.map(project, UnderConstructionProjectDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public List<InLaunchProjectDto> getAllInLaunchProject(String status, Long SquadId) {
        List<Project> projects = repository.findAllByStatusAndSquad(status, SquadId);
        return projects.stream()
                .map((project -> mapper.map(project, InLaunchProjectDto.class)))
                .collect(Collectors.toList());
    }
    @Override
    public ProjectDto getProjectById(Long id) {
        Project project =  repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));
        return mapper.map(project, ProjectDto.class);

    }
    @Override
    public List<ProjectItemDto> getAllProjects(Integer domainId){
        List<Project> projects = repository.findAllByDomainId(domainId);
        return projects.stream()
                .map((project -> mapper.map(project, ProjectItemDto.class)))
                .collect(Collectors.toList());
    }
    @Override
    public ProjectCreationDto createProject(ProjectCreationDto projectDto) {

        Project project = new Project();
        project.setName(projectDto.getName());
        project.setDomainId(projectDto.getDomainId());
        project.setOwner(projectDto.getOwner());
        project.setStartDate(projectDto.getStartDate());
        project.setExpectedEndDate(projectDto.getExpectedEndDate());
        project.setType(projectDto.getType());
        project.setDescription(projectDto.getDescription());
//        project.setStatus(projectDto.getStatus());
        project.setSquad(projectDto.getSquad());
        project.setAllocatedSprintCount(projectDto.getAllocatedSprintCount());
        Project savedProject = repository.save(project);
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
        project.setDescription(projectDto.getDescription());
        //project.setStatus(projectDto.getStatus());
        project.setAllocatedSprintCount(projectDto.getAllocatedSprintCount());
        project.setConsumedSprintCount(projectDto.getConsumedSprintCount());
        project.setCompletionPercentage(projectDto.getCompletionPercentage());
        project.setSquad(projectDto.getSquad());
        project.setPilotageKpis(projectDto.getPilotageKpis());
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
        project.setRemarks(projectDto.getRemarks());
        project.setType(projectDto.getType());
        project.setStatus(projectDto.getStatus());
        project.setPilotageKpis(projectDto.getPilotageKpis());
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
        project.setAllocatedSprintCount(projectDto.getAllocatedSprintCount());
        project.setConsumedSprintCount(projectDto.getConsumedSprintCount());
        project.setPhase(projectDto.getPhase());
        project.setMilestones(projectDto.getMilestones());
        project.setUpcomingRealizations(projectDto.getUpcomingRealizations());
        project.setType(projectDto.getType());
        project.setRemarks(projectDto.getRemarks());
        project.setCompletionPercentage(project.getCompletionPercentage());
        project.setSquad(projectDto.getSquad());
        project.setStatus(projectDto.getStatus());

        Project savedProject = repository.save(project);
        return mapper.map(savedProject, UnderConstructionProjectDto.class);
    }

    @Override
    public void deleteProject(Long id) {
        Project project = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " +id));
        repository.delete(project);
    }

    @Override
    public void addMilestone(MilestoneDto milestone, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " +projectId));

        project.getMilestones().add(milestone.getName());
        repository.save(project);
    }

    @Override
    public void addUpcomingRealization(RealizationDto upcomingRealization, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " +projectId));

        project.getUpcomingRealizations().add(upcomingRealization.getName());
        repository.save(project);
    }

    @Override
    public void updateProjectPhase(CustomPhaseDto phaseDto, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " +projectId));

        CustomPhase phase = customPhaseRepository.findById(phaseDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Phase not found with id: " + phaseDto.getId().toString()));

        project.setPhase(phase);
        repository.save(project);
    }

    @Override
    public void updateProjectSquad(SquadDto squadDto, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        Squad squad = squadRepository.findById(squadDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Squad not found with id" + squadDto.getId()));

        project.setSquad(squad);
        repository.save(project);
    }

    @Override
    public void updateProjectName(String name, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setName(name);
        repository.save(project);
    }

    @Override
    public void updateProjectOwner(String owner, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setOwner(owner);
        repository.save(project);
    }

    @Override
    public void updateProjectStartDate(String startDate, Long projectId) {
        LocalDate date = LocalDate.parse(startDate);
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setStartDate(date);
        repository.save(project);
    }

    @Override
    public void updateProjectExpectedDate(String expectedEndDate, Long projectId) {
        LocalDate date = LocalDate.parse(expectedEndDate);
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setExpectedEndDate(date);
        repository.save(project);
    }

    @Override
    public void updateProjectType(String type, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setType(type);
        repository.save(project);
    }



    @Override
    public void updateProjectDescription(String description, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setDescription(description);
        repository.save(project);
    }

    @Override
    public void updateProjectAllocatedSprintCount(Integer allocatedSprintCount, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setAllocatedSprintCount(allocatedSprintCount);
        repository.save(project);
    }

    @Override
    public void updateProjectConsumedSprintCount(Integer consumedSprintCount, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setConsumedSprintCount(consumedSprintCount);
        repository.save(project);
    }

    @Override
    public void updateProjectCompletionPercentage(String ccompletionPercentage, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setCompletionPercentage(ccompletionPercentage);
        repository.save(project);
    }

    @Override
    public void updateProjectActualMepDate(String actualMepDate, Long projectId) {
        LocalDate date = LocalDate.parse(actualMepDate);
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setActualMepDate(date);
        repository.save(project);
    }

    @Override
    public void updateProjectLastPhaseDate(String lastPhaseDate, Long projectId) {
        LocalDate date = LocalDate.parse(lastPhaseDate);
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.setLastPhaseDate(date);
        repository.save(project);
    }

    @Override
    public void updateProjectMilestone(String milestone, Integer index, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.getMilestones().set(index, milestone);
        repository.save(project);
    }

    @Override
    public void updateProjectUpcomingRealization(String realization, Integer index, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));

        project.getUpcomingRealizations().set(index, realization);
        repository.save(project);
    }

}
