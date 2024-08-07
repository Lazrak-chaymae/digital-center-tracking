package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.RemarkOrRiskDto;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.entity.RemarkOrRisk;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.repository.RemarkOrRiskRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RemarkOrRiskServiceImpl implements RemarkOrRiskService{

    private RemarkOrRiskRepository repository;
    private ProjectRepository projectRepository;
    private ModelMapper mapper;

    @Override
    public RemarkOrRiskDto createRemarkOrRisk(RemarkOrRiskDto remarkOrRiskDto, Long projectId) {
        RemarkOrRisk remarkOrRisk = new RemarkOrRisk();
        remarkOrRisk.setName(remarkOrRiskDto.getName());
        remarkOrRisk.setImportance(remarkOrRiskDto.getImportance());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id : " + projectId));
        remarkOrRisk.setProject(project);
        repository.save(remarkOrRisk);
        return mapper.map(remarkOrRisk, RemarkOrRiskDto.class);
    }
}
