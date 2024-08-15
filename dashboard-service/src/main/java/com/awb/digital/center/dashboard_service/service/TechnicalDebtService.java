package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.TechnicalDebtDto;

import java.util.List;

public interface TechnicalDebtService {

    TechnicalDebtDto createDebt(TechnicalDebtDto technicalDebtDto);
    List<TechnicalDebtDto> getAllDebt(Integer domainId);
    TechnicalDebtDto updateDebt(Long id, TechnicalDebtDto technicalDebtDto);
    void deleteDebt(Long id);
}
