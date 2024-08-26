package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.RemarkOrRiskDto;

public interface RemarkOrRiskService {
          RemarkOrRiskDto createRemarkOrRisk(RemarkOrRiskDto remarkOrRiskDto, Long projectId);
    void updateRemarkOrRiskName(String name, Long id);
    void updateRemarkOrRiskImportance(String importance, Long id);
    void deleteRemarkOrRisk(Long id);

}
