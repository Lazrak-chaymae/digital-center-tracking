package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;
import com.awb.digital.center.project_service.entity.KpiPilotage;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.KpiPilotageRepository;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;



@AllArgsConstructor
@Service
public class KpiPilotageServiceImpl implements KpiPilotageService{

    private KpiPilotageRepository kpiPilotageRepository;
    private ProjectRepository projectRepository;
    private ModelMapper mapper;

    @Override
    public KpiPilotageDto createKpi(KpiPilotageDto kpiPilotageDto, Long projectId) {
        KpiPilotage kpiPilotage = new KpiPilotage();
        kpiPilotage.setId(kpiPilotageDto.getId());
        kpiPilotage.setName(kpiPilotageDto.getName());
        kpiPilotage.setCurrent(kpiPilotageDto.getCurrent());
        kpiPilotage.setTarget(kpiPilotageDto.getTarget());
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));;
        kpiPilotage.setProject(project);
        kpiPilotageRepository.save(kpiPilotage);
        return mapper.map(kpiPilotage, KpiPilotageDto.class);
    }

}
