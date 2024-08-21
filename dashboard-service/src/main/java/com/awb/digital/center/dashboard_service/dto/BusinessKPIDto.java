package com.awb.digital.center.dashboard_service.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BusinessKPIDto {
    private Long id;
    private Integer domainId;
    private String functionality;
    private String indicator;
    private String planned;
    private String achieved;
    private String previousMeasure;
    private String type;
}
