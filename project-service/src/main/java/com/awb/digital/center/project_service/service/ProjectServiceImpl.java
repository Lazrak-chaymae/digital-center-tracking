package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.*;
import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.entity.RemarkOrRisk;
import com.awb.digital.center.project_service.entity.Task;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.PhaseRepository;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class ProjectServiceImpl implements ProjectService{

    private ProjectRepository repository;
    private PhaseRepository phaseRepository;
    private TaskRepository taskRepository;
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
        Project project =  repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + id));
        return mapper.map(project, ProjectDto.class);

    }
    @Override
    public List<ProjectItemDto> getAllProjects(){
        List<Project> projects = repository.findAll();
        return projects.stream()
                .map((project -> mapper.map(project, ProjectItemDto.class)))
                .collect(Collectors.toList());
    }
    @Override
    public ProjectCreationDto createProject(ProjectCreationDto projectDto) {

        Project project = new Project();
        project.setName(projectDto.getName());
        project.setOwner(projectDto.getOwner());
        project.setStartDate(projectDto.getStartDate());
        project.setExpectedEndDate(projectDto.getExpectedEndDate());
        project.setType(projectDto.getType());
        project.setBudget(projectDto.getBudget());
        project.setDescription(projectDto.getDescription());
        project.setStatus(projectDto.getStatus());
        project.setSquad(projectDto.getSquad());
        project.setAllocatedSprintCount(projectDto.getAllocatedSprintCount());

        Project savedProject = repository.save(project);

        List<Phase> defaultPhases = List.of(
                new Phase("Imagination et Cadrage", List.of(
                        new Task("Etude d'opportunité ou marché", "0%"),
                        new Task("Identification des personas", "0%"),
                        new Task("Définition des besoins des personas", "0%"),
                        new Task("Design du parcours utilisateur", "0%"),
                        new Task("Architecture", "0%"),
                        new Task("Validation Secops", "0%"),
                        new Task("Analyse des risques SSI", "0%"),
                        new Task("Conformité et Juridique", "0%"),
                        new Task("User Stories", "0%")
                )),
                new Phase("Réalisation", List.of(
                        new Task("Développement Front", "0%"),
                        new Task("Développement Backend", "0%"),
                        new Task("Intégration", "0%"),
                        new Task("Test QA", "0%"),
                        new Task("Test Recette", "0%")
                )),
                new Phase("MEP", List.of(
                        new Task("Packaging et Release notes", "0%"),
                        new Task("Test d'installation", "0%"),
                        new Task("Test de sécurité", "0%"),
                        new Task("Test de performance", "0%"),
                        new Task("CAB", "0%"),
                        new Task("Installation", "0%"),
                        new Task("Pilote", "0%"),
                        new Task("Généralisation", "0%")
                ))
        );
        for (Phase phase : defaultPhases) {
            phase.setProject(project);
            Phase savedPhase = phaseRepository.save(phase);
            for (Task task : phase.getTasks()) {
                task.setPhase(savedPhase);
                taskRepository.save(task);
            }
        }
       savedProject.setPhases(defaultPhases);
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
        //project.setPhases(projectDto.getPhases());
        List<Phase> updatedPhases = new ArrayList<>();
        for (Phase phaseDto : projectDto.getPhases()) {
            Phase phase = phaseRepository.findById(phaseDto.getId())
                    .orElse(new Phase());
            // Fetch existing or create a new Phase if not found
            phase.setName(phaseDto.getName());
            phase.setProject(project); // Set the relationship to the project

            List<Task> tasks = new ArrayList<>();
            for (Task taskDto : phaseDto.getTasks()) {
                Task task = taskRepository.findById(taskDto.getId())
                        .orElse(new Task()); // Fetch existing or create a new Task if not found
                task.setName(taskDto.getName());
                task.setProgress(taskDto.getProgress());
                task.setPhase(phase);// Set the relationship to the phase
                tasks.add(task);
            }
            phase.setTasks(tasks); // Set tasks to the phase
            updatedPhases.add(phase);
        }
        project.setPhases(updatedPhases); // Set phases to the project


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

    @Override
    public void deleteProject(Long id) {
        repository.deleteById(id);
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
    public void updateProjectPhase(String newPhase, Long projectId) {
        Project project = repository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " +projectId));
        project.setPhase(newPhase);
        repository.save(project);
    }
}
