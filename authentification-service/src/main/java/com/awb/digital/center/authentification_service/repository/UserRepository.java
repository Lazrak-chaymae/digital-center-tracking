package com.awb.digital.center.authentification_service.repository;

import com.awb.digital.center.authentification_service.entity.Domain;
import com.awb.digital.center.authentification_service.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    Boolean existsByRoleNameAndDomainName(String roleName, String domainName);
    List<User> findAllByDomain(Domain domain);
}
