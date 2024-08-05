package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.KpiPilotage;
import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.RemarkOrRisk;
import com.awb.digital.center.project_service.entity.Squad;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectItemDto {

    private Long id;
    private String name;
    private String status;
    private String phase;
    private Squad squad;
    private LocalDate expectedEndDate;

}
