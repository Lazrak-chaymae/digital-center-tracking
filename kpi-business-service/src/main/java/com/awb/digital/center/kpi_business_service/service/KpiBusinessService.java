package com.awb.digital.center.kpi_business_service.service;

import com.awb.digital.center.kpi_business_service.dto.KpiBusinessDto;

import java.util.List;

public interface KpiBusinessService {

    KpiBusinessDto createKpi(KpiBusinessDto kpiBusinessDto);
    List<KpiBusinessDto> getAllKpiByType(String type);
    KpiBusinessDto updateKpi(Long id, KpiBusinessDto kpiBusinessDto);
    void deleteKpi(Long id);

}
