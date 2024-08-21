package com.awb.digital.center.todo_service;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

      List<TodoEntity> findByDomainId(Integer domainId);
      List<TodoEntity> findByProjectId(Integer projectId);

}
