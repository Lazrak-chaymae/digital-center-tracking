package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.ReleaseDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public interface ReleaseService {

    ReleaseDto createRelease(ReleaseDto releaseDto);
    List<ReleaseDto> getAllReleases(Integer domainId);
    ReleaseDto updateRelease(Long id, ReleaseDto releaseDto);
    void deleteRelease(Long id);
    void updateInstallationDate(Long id, String installationDate);
    void updateVersion(Long id, String version);
    void updateType(Long id, String type);
    void updatePackages(Long id, String packages);
    void updateHotfixContents(Long id, String hotfixContent);
    void updateEvolution(Long id, String evolution);


}
