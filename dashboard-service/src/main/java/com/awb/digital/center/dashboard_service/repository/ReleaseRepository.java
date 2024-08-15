package com.awb.digital.center.dashboard_service.repository;

import com.awb.digital.center.dashboard_service.entity.Release;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReleaseRepository extends JpaRepository<Release, Long> {

    List<Release> findByDomainId(Integer domainId);
}
