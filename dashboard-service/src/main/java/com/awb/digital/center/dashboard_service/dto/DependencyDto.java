package com.awb.digital.center.dashboard_service.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DependencyDto {

    private Long id;
    private Integer domainId;
    private String title;
    private String priority;
    private String responsibleTeam;
    private String beneficiaryTeam;
    private LocalDate scheduledDate;
}
