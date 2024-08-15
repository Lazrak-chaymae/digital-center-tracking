package com.awb.digital.center.dashboard_service.repository;

import com.awb.digital.center.dashboard_service.entity.Support;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportRepository extends JpaRepository<Support, Long> {

    Support findByDomainId(Integer domainId);
}
