package com.awb.digital.center.dependency_service.repository;

import com.awb.digital.center.dependency_service.entity.Dependency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DependencyRepository extends JpaRepository<Dependency, Long> {
}
