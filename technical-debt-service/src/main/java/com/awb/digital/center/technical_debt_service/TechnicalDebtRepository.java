package com.awb.digital.center.technical_debt_service;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicalDebtRepository extends JpaRepository<TechnicalDebtEntity, Long> {
}
