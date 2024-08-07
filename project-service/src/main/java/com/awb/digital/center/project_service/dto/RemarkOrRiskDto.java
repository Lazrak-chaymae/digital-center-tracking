package com.awb.digital.center.project_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RemarkOrRiskDto {

    private Long id;
    private String name;
    private String importance;

}
