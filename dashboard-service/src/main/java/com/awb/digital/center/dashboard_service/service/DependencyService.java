package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.DependencyDto;

import java.util.List;

public interface DependencyService {

    DependencyDto createDependency(DependencyDto dependencyDto);
    List<DependencyDto> getAllDependencies(Integer domainId);
    DependencyDto updateDependency(Long id, DependencyDto dependencyDto);
    void deleteDependency(Long id);
}
