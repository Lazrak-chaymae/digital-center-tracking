package com.awb.digital.center.dependency_service.service;

import com.awb.digital.center.dependency_service.dto.DependencyDto;

import java.util.List;

public interface DependencyService {

          DependencyDto createDependency(DependencyDto dependencyDto);
          List<DependencyDto> getAllDependency();
          DependencyDto updateDependency(Long id, DependencyDto dependencyDto);
          void deleteDependency(Long id);
}
