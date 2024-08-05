package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PhaseRepository extends JpaRepository<Phase, Long> {


}
