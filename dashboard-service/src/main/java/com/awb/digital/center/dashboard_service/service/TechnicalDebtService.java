package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.TechnicalDebtDto;

import java.util.ArrayList;
import java.util.List;

public interface TechnicalDebtService {

    TechnicalDebtDto createDebt(TechnicalDebtDto technicalDebtDto);
    List<TechnicalDebtDto> getAllDebt(Integer domainId);
    TechnicalDebtDto updateDebt(Long id, TechnicalDebtDto technicalDebtDto);
    void deleteDebt(Long id);
    void updateTitle(Long id, String title);
    void updateType(Long id, String type);
    void updateImpact(Long id, String impact);
    void updateCost(Long id, String cost);
    void updateVoluntary(Long id, String voluntary);
    void updateComments(Long id, Integer index, String comment);

}
