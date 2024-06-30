package com.awb.digital.center.dependency_service.service;

import com.awb.digital.center.dependency_service.dto.DependencyDto;
import com.awb.digital.center.dependency_service.entity.Dependency;
import com.awb.digital.center.dependency_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dependency_service.repository.DependencyRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class DependencyServiceImpl implements DependencyService{

    private DependencyRepository repository;

    private ModelMapper modelMapper;

    @Override
    public DependencyDto createDependency(DependencyDto dependencyDto) {
        Dependency dependency = modelMapper.map(dependencyDto, Dependency.class);
        Dependency savedDependency = repository.save(dependency);
        return modelMapper.map(savedDependency, DependencyDto.class);
    }

    @Override
    public List<DependencyDto> getAllDependency() {
        List<Dependency> dependencies = repository.findAll();

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
}
