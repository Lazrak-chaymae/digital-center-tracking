package com.awb.digital.center.authentification_service.repository;

import com.awb.digital.center.authentification_service.entity.Domain;
import com.awb.digital.center.authentification_service.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DomainRepository extends JpaRepository<Domain, Long> {
    Domain findByName(String name);
}
