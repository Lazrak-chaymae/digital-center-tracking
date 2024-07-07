package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.ReleaseDto;

import java.util.List;

public interface ReleaseService {

    ReleaseDto createRelease(ReleaseDto releaseDto);
    List<ReleaseDto> getAllRelease();
    ReleaseDto updateRelease(Long id, ReleaseDto releaseDto);
    void deleteRelease(Long id);
}
