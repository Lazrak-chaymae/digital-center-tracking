package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findAllByStatus(String status);
@Query("SELECT p FROM Project p WHERE p.status = :status AND p.squad.id = :squadId")
List<Project> findAllByStatusAndSquad(@Param("status") String status, @Param("squadId") Long squadId);




}
