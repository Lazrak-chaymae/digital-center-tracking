package com.awb.digital.center.kpi_business_service.repository;

import com.awb.digital.center.kpi_business_service.entity.KpiBusiness;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KpiBusinessRepository extends JpaRepository<KpiBusiness, Long> {
          List<KpiBusiness> findAllByType(String type);
}
