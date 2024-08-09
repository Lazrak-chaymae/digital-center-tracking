package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.CustomPhaseDto;
import java.util.List;

public interface CustomPhaseService {

    List<CustomPhaseDto> getAllPhases(Integer domainId);
    CustomPhaseDto addPhase(CustomPhaseDto phase);
}
