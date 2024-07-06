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
    private String functionality;
    private String indicator;
    private Integer planned;
    private Integer achieved;
    private String previousMeasure;
    private String type;
}
