package com.awb.digital.center.dashboard_service.service.impl;

import com.awb.digital.center.dashboard_service.dto.DependencyDto;
import com.awb.digital.center.dashboard_service.entity.Dependency;
import com.awb.digital.center.dashboard_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dashboard_service.repository.DependencyRepository;
import com.awb.digital.center.dashboard_service.service.DependencyService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DependencyServiceImpl implements DependencyService {

    private DependencyRepository repository;

    private ModelMapper modelMapper;

    @Override
    public DependencyDto createDependency(DependencyDto dependencyDto) {
        Dependency dependency = modelMapper.map(dependencyDto, Dependency.class);
        Dependency savedDependency = repository.save(dependency);
        return modelMapper.map(savedDependency, DependencyDto.class);
    }

    @Override
    public List<DependencyDto> getAllDependencies(Integer domainId) {
        List<Dependency> dependencies = repository.findByDomainId(domainId);

        return dependencies.stream()
                .map((dependency -> modelMapper.map(dependency, DependencyDto.class)))
                .collect(Collectors.toList());
    }

    @Override
    public DependencyDto updateDependency(Long id, DependencyDto dependencyDto) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id))   ;
        dependency.setTitle(dependencyDto.getTitle());
        dependency.setPriority(dependencyDto.getPriority());
        dependency.setResponsibleTeam(dependencyDto.getResponsibleTeam());
        dependency.setBeneficiaryTeam(dependencyDto.getBeneficiaryTeam());
        dependency.setScheduledDate(dependencyDto.getScheduledDate());

        Dependency savedDependency = repository.save(dependency);

        return modelMapper.map(savedDependency, DependencyDto.class);

    }

    @Override
    public void deleteDependency(Long id) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        repository.delete(dependency);
    }

    @Override
    public void updateTitle(Long id, String title) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        dependency.setTitle(title);
        repository.save(dependency);
    }

    @Override
    public void updatePriority(Long id, String priority) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        dependency.setPriority(priority);
        repository.save(dependency);
    }

    @Override
    public void updateResponsibleTeam(Long id, String responsibleTeam) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        dependency.setResponsibleTeam(responsibleTeam);
        repository.save(dependency);
    }

    @Override
    public void updateBeneficiaryTeam(Long id, String beneficiaryTeam) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        dependency.setBeneficiaryTeam(beneficiaryTeam);
        repository.save(dependency);
    }

    @Override
    public void updateScheduledDate(Long id, LocalDate scheduledDate) {
        Dependency dependency = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Dependency not found with id:" +id));
        dependency.setScheduledDate(scheduledDate);
        repository.save(dependency);
    }
}
