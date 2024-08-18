package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.BusinessKPIDto;

import java.util.List;

public interface BusinessKPIService {

    List<BusinessKPIDto> getAllKpiByTypeAndDomain(String type, Integer domainId);
    BusinessKPIDto createKpi(BusinessKPIDto businessKPIDto);
    BusinessKPIDto updateKpi(Long id, BusinessKPIDto businessKPIDto);
    void deleteKpi(Long id);
    void updateFunctionality(Long id, String functionality);
    void updateIndicator(Long id, String indicator);
    void updatePlanned(Long id, Integer planned);
    void updateAchieved(Long id, Integer achieved);
    void updatePreviousMeasure(Long id, String previousMeasure);

}
