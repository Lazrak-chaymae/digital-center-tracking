package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.RemarkOrRiskDto;

public interface RemarkOrRiskService {
          RemarkOrRiskDto createRemarkOrRisk(RemarkOrRiskDto remarkOrRiskDto, Long projectId);
    void updateRemarkName(String remarkName, Long remarkId);
    void updateRemarkImportance(String remarkImportance, Long remarkId);


}
