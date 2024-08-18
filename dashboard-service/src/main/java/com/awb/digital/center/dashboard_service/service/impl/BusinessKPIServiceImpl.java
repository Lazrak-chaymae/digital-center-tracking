package com.awb.digital.center.dashboard_service.service.impl;

import com.awb.digital.center.dashboard_service.dto.BusinessKPIDto;
import com.awb.digital.center.dashboard_service.entity.BusinessKPI;
import com.awb.digital.center.dashboard_service.exception.ResourceNotFoundException;
import com.awb.digital.center.dashboard_service.repository.BusinessKPIRepository;
import com.awb.digital.center.dashboard_service.service.BusinessKPIService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class BusinessKPIServiceImpl implements BusinessKPIService {

    private BusinessKPIRepository repository;
    private ModelMapper mapper;


    @Override
    public List<BusinessKPIDto> getAllKpiByTypeAndDomain(String type, Integer domainId) {
        List<BusinessKPI> kpis =  repository.findAllByTypeAndDomainId(type, domainId);

        return kpis.stream()
                .map((kpi) -> mapper.map(kpi, BusinessKPIDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public BusinessKPIDto createKpi(BusinessKPIDto businessKPIDto) {
        BusinessKPI kpi = mapper.map(businessKPIDto, BusinessKPI.class);
        BusinessKPI savedKpi =repository.save(kpi);
        BusinessKPIDto savedKpiDto= mapper.map(savedKpi, BusinessKPIDto.class);
        return savedKpiDto;
    }

    @Override
    public BusinessKPIDto updateKpi(Long id, BusinessKPIDto businessKPIDto) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpi.setFunctionality(businessKPIDto.getFunctionality());
        kpi.setIndicator(businessKPIDto.getIndicator());
        kpi.setPlanned(businessKPIDto.getPlanned());
        kpi.setAchieved(businessKPIDto.getAchieved());
        kpi.setPreviousMeasure(businessKPIDto.getPreviousMeasure());
        kpi.setType(businessKPIDto.getType());

        BusinessKPI updatedKpi = repository.save(kpi);

        return mapper.map(updatedKpi, BusinessKPIDto.class);
    }

    @Override
    public void deleteKpi(Long id) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        repository.deleteById(id);
    }

    @Override
    public void updateFunctionality(Long id, String functionality) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpi.setFunctionality(functionality);
        repository.save(kpi);
    }

    @Override
    public void updateIndicator(Long id, String indicator) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));


        kpi.setIndicator(indicator);
        repository.save(kpi);
    }

    @Override
    public void updatePlanned(Long id, Integer planned) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpi.setPlanned(planned);
        repository.save(kpi);
    }

    @Override
    public void updateAchieved(Long id, Integer achieved) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpi.setAchieved(achieved);
        repository.save(kpi);
    }

    @Override
    public void updatePreviousMeasure(Long id, String previousMeasure) {
        BusinessKPI kpi = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpi.setPreviousMeasure(previousMeasure);
        repository.save(kpi);
    }
}
