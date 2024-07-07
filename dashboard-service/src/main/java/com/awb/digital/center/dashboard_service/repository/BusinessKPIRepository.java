package com.awb.digital.center.dashboard_service.repository;

import com.awb.digital.center.dashboard_service.entity.BusinessKPI;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessKPIRepository extends JpaRepository<BusinessKPI, Long> {
        List<BusinessKPI> findAllByType(String type);
}
