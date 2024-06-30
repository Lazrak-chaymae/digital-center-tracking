package com.awb.digital.center.kpi_business_service.service;

import com.awb.digital.center.kpi_business_service.dto.KpiBusinessDto;
import com.awb.digital.center.kpi_business_service.entity.KpiBusiness;
import com.awb.digital.center.kpi_business_service.exception.ResourceNotFoundException;
import com.awb.digital.center.kpi_business_service.repository.KpiBusinessRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class KpiBusinessServiceImpl implements KpiBusinessService{

    private KpiBusinessRepository kpiBusinessRepository;

    private ModelMapper modelMapper;

    @Override
    public KpiBusinessDto createKpi(KpiBusinessDto kpiBusinessDto) {

        KpiBusiness kpiBusiness = modelMapper.map(kpiBusinessDto, KpiBusiness.class);
        KpiBusiness savedKpi = kpiBusinessRepository.save(kpiBusiness) ;

        KpiBusinessDto savedKpiDto = modelMapper.map(savedKpi, KpiBusinessDto.class);

        return savedKpiDto;
    }


    @Override
    public List<KpiBusinessDto> getAllKpiByType(String type) {
        List<KpiBusiness> kpis = kpiBusinessRepository.findAllByType(type);

        return kpis.stream()
                .map((kpi) -> modelMapper.map(kpi, KpiBusinessDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public KpiBusinessDto updateKpi(Long id, KpiBusinessDto kpiBusinessDto) {
        KpiBusiness kpiBusiness = kpiBusinessRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpiBusiness.setFunctionality(kpiBusinessDto.getFunctionality());
        kpiBusiness.setIndicator(kpiBusinessDto.getIndicator());
        kpiBusiness.setPlanned(kpiBusinessDto.getPlanned());
        kpiBusiness.setAchieved(kpiBusinessDto.getAchieved());
        kpiBusiness.setPreviousMeasure(kpiBusinessDto.getPreviousMeasure());
        kpiBusiness.setType(kpiBusinessDto.getType());

        KpiBusiness updatedKpi = kpiBusinessRepository.save(kpiBusiness);

        return modelMapper.map(updatedKpi, KpiBusinessDto.class);
    }

    @Override
    public void deleteKpi(Long id) {
        KpiBusiness kpiBusiness = kpiBusinessRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Kpi not found with id:" +id));

        kpiBusinessRepository.delete(kpiBusiness);

    }
}
