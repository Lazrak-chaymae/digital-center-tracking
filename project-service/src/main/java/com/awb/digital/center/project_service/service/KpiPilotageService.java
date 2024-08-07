package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;

public interface KpiPilotageService {
          KpiPilotageDto  createKpi(KpiPilotageDto kpiPilotageDto, Long projectId);

}
