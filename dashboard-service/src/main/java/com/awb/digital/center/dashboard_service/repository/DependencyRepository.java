package com.awb.digital.center.dashboard_service.repository;

import com.awb.digital.center.dashboard_service.entity.Dependency;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DependencyRepository extends JpaRepository<Dependency, Long> {

    List<Dependency> findByDomainId(Integer domainId);
}
