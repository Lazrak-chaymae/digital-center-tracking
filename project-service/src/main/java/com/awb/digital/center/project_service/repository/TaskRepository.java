package com.awb.digital.center.project_service.repository;

import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {


}
