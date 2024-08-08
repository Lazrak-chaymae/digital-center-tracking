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
public class UnderConstructionProjectDto {

        private Long id;
        private String name;
        private String description;
        private LocalDate startDate;
        private String budget;
        private Float consumed;
        private Integer consumedSprintCount;
        private String phase;
        private List<String> milestones = new ArrayList<>();
        private List<String> upcomingRealizations = new ArrayList<>();
        private String type;
        private List<RemarkOrRisk> remarks;
        private String progress;
        private Squad squad;
        private String status;





}
