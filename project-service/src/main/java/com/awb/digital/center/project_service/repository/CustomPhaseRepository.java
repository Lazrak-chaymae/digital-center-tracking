package com.awb.digital.center.project_service.repository;


import com.awb.digital.center.project_service.entity.CustomPhase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomPhaseRepository extends JpaRepository<CustomPhase, Long> {

     //boolean existsByName(String phaseName);
     boolean existsByNameAndDomainId(String phaseName, Integer DomainId);
     List<CustomPhase> findAllByDomainId(Integer domainId);
}
