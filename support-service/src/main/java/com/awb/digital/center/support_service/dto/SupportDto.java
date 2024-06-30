package com.awb.digital.center.support_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SupportDto {

    private Long id;
    private Integer ticketCount;
    private String effortSpent;
    private List<TopSubjectDto> topSubjects;
}
