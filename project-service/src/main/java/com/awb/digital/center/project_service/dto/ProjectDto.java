package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.*;
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
public class ProjectDto {

    private Long id;
    private String name;
    private String owner;
    private LocalDate startDate;
    private LocalDate expectedEndDate;
    private CustomPhase phase;
    private String type;
    private String budget;
    private String description;
    private String status;
    private Integer allocatedSprintCount;
    private Integer consumedSprintCount;
    private String completionPercentage;

    private Squad squad;
    private List<KpiPilotage> pilotageKpis;
    private List<Phase> phases;
    private List<RemarkOrRisk> remarks;

    private List<String> milestones = new ArrayList<>();
    private List<String> upcomingRealizations = new ArrayList<>();

}
