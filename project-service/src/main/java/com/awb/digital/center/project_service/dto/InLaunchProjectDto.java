package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.KpiPilotage;
import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.RemarkOrRisk;
import com.awb.digital.center.project_service.entity.Squad;
import jakarta.persistence.*;
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
public class InLaunchProjectDto {
    private Long id;
    private String name;
    private String description;
    private LocalDate actualMepDate;
    private LocalDate lastPhaseDate;
    private String phase;
    private List<String> kpis = new ArrayList<>();
    private List<RemarkOrRisk> remarks;
    private String type;
    private String status;

}
