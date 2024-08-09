package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Etape;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EtapeRepository extends JpaRepository<Etape, Long> {


    List<Etape> findAllByDomainId(Integer domainId);

}
