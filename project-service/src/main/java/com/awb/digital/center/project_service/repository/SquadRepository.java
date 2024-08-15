package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Squad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SquadRepository extends JpaRepository<Squad, Long> {

    List<Squad> findAllByDomainId(Integer domainId);

}
