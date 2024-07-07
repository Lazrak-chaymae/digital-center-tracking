package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.BusinessKPIDto;

import java.util.List;

public interface BusinessKPIService {

    List<BusinessKPIDto> getAllKpiByType(String type);
    BusinessKPIDto createKpi(BusinessKPIDto businessKPIDto);
    BusinessKPIDto updateKpi(Long id, BusinessKPIDto businessKPIDto);
    void deleteKpi(Long id);
}
