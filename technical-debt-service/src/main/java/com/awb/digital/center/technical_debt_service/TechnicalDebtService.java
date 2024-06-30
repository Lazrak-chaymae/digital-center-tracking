package com.awb.digital.center.technical_debt_service;

import java.util.List;

public interface TechnicalDebtService {

    TechnicalDebtDto createDebt(TechnicalDebtDto technicalDebtDto);
    List<TechnicalDebtDto> getAllDebt();
    TechnicalDebtDto updateDebt(Long id, TechnicalDebtDto technicalDebtDto);
    void deleteDebt(Long id);
}
