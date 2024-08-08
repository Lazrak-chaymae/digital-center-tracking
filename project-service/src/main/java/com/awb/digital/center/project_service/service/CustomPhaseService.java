package com.awb.digital.center.project_service.service;

import com.awb.digital.center.project_service.dto.CustomPhaseDto;
import com.awb.digital.center.project_service.entity.CustomPhase;

import java.util.List;

public interface CustomPhaseService {
    List<CustomPhaseDto> getAllPhases();
    CustomPhaseDto addPhase(CustomPhaseDto phase);
}
