package com.awb.digital.center.dashboard_service.repository;

import com.awb.digital.center.dashboard_service.entity.TechnicalDebt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TechnicalDebtRepository extends JpaRepository<TechnicalDebt, Long> {
       List<TechnicalDebt> findByDomainId(Integer domainId);
}
