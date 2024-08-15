package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {


    List<Task> findByEtapeIdAndProjectId(Long etapeId, Long projectId);

}
