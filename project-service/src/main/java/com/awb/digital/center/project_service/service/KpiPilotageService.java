package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;

public interface KpiPilotageService {
          KpiPilotageDto  createKpi(KpiPilotageDto kpiPilotageDto, Long projectId);
          void updateKPIName(String kpiName, Long kpiId);
          void updateKPITarget(String kpiTarget, Long kpiId);
          void updateKPICurrent(String kpiCurrent, Long kpiId);
          void deleteKPI(Long kpiId);


}
