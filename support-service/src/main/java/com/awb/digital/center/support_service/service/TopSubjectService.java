package com.awb.digital.center.support_service.service;

import com.awb.digital.center.support_service.dto.SupportDto;
import com.awb.digital.center.support_service.dto.TopSubjectDto;

import java.util.List;

public interface TopSubjectService {

    TopSubjectDto createTopSubject(TopSubjectDto topSubjectDto);
    List<TopSubjectDto> getAllTopSubject();
    TopSubjectDto updateTopSubject(Long id, TopSubjectDto topSubjectDto);
    void deleteTopSubject(Long id);
}
