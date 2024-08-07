package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KpiPilotageDto {

    private Long id;
    private String name;
    private String target;
    private String current;
}
