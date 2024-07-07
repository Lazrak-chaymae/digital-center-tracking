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
    public List<BusinessKPIDto> getAllKpiByType(String type) {
        List<BusinessKPI> kpis =  repository.findAllByType(type);

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
}
