package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.DependencyDto;

import java.time.LocalDate;
import java.util.List;

public interface DependencyService {

    DependencyDto createDependency(DependencyDto dependencyDto);
    List<DependencyDto> getAllDependencies(Integer domainId);
    DependencyDto updateDependency(Long id, DependencyDto dependencyDto);
    void deleteDependency(Long id);
    void updateTitle(Long id , String title);
    void updatePriority(Long id, String priority);
    void updateResponsibleTeam(Long id, String responsibleTeam);
    void updateBeneficiaryTeam(Long id, String beneficiaryTeam);
    void updateScheduledDate(Long id, LocalDate scheduledDate);


}
