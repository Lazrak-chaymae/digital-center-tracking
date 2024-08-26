package com.awb.digital.center.project_service.service.impl;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;
import com.awb.digital.center.project_service.entity.KpiPilotage;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.exception.ResourceNotFoundException;
import com.awb.digital.center.project_service.repository.KpiPilotageRepository;
import com.awb.digital.center.project_service.repository.ProjectRepository;
import com.awb.digital.center.project_service.service.KpiPilotageService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;



@AllArgsConstructor
@Service
public class KpiPilotageServiceImpl implements KpiPilotageService {

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
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id:" + projectId));
        kpiPilotage.setProject(project);
        kpiPilotageRepository.save(kpiPilotage);
        return mapper.map(kpiPilotage, KpiPilotageDto.class);
    }

    @Override
    public void updateKPIName(String kpiName, Long kpiId) {
        KpiPilotage kpi = kpiPilotageRepository.findById(kpiId)
                .orElseThrow(() -> new ResourceNotFoundException("kpi not found with id:" + kpiId));

        kpi.setName(kpiName);
        kpiPilotageRepository.save(kpi);
    }

    @Override
    public void updateKPITarget(String kpiTarget, Long kpiId) {
        KpiPilotage kpi = kpiPilotageRepository.findById(kpiId)
                .orElseThrow(() -> new ResourceNotFoundException("kpi not found with id:" + kpiId));

        kpi.setTarget(kpiTarget);
        kpiPilotageRepository.save(kpi);
    }

    @Override
    public void updateKPICurrent(String kpiCurrent, Long kpiId) {
        KpiPilotage kpi = kpiPilotageRepository.findById(kpiId)
                .orElseThrow(() -> new ResourceNotFoundException("kpi not found with id:" + kpiId));

        kpi.setCurrent(kpiCurrent);
        kpiPilotageRepository.save(kpi);
    }

    @Override
    public void deleteKPI(Long kpiId) {
        KpiPilotage kpi = kpiPilotageRepository.findById(kpiId)
                .orElseThrow(() -> new ResourceNotFoundException("kpi not found with id:" + kpiId));

        kpiPilotageRepository.delete(kpi);
    }

}
