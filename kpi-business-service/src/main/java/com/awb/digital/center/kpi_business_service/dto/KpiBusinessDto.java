package com.awb.digital.center.kpi_business_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class KpiBusinessDto {
    private Long id;
    private String functionality;
    private String indicator;
    private Integer planned;
    private Integer achieved;
    private String previousMeasure;
    private String type;
}
