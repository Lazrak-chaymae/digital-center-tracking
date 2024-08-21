package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.*;
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
    private CustomPhase phase;
    private List<KpiPilotage> pilotageKpis;
    private List<RemarkOrRisk> remarks;
    private String type;
    private String status;

}
