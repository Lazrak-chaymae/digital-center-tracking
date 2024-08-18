package com.awb.digital.center.dashboard_service.service;

import com.awb.digital.center.dashboard_service.dto.SupportDto;
import com.awb.digital.center.dashboard_service.repository.SupportRepository;
import org.modelmapper.ModelMapper;

import java.util.List;

public interface SupportService {

    SupportDto createSupport(SupportDto supportDto);
    SupportDto getSupport(Integer domainId);
    SupportDto updateSupport(Long id, SupportDto supportDto);
    void deleteSupport(Long id);
    void updateTicketCount(Long id, Integer ticketCount);
    void updateEffortSpent(Long id, String effortSpent);
    void updateTopSubjects(Long id, Integer index ,String subject);


}
