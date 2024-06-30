package com.awb.digital.center.support_service.service;

import com.awb.digital.center.support_service.dto.SupportDto;

import java.util.List;

public interface SupportService {

    SupportDto createSupport(SupportDto supportDto);
    List<SupportDto> getAllSupport();
    SupportDto updateSupport(Long id, SupportDto supportDto);
    void deleteSupport(Long id);
}
