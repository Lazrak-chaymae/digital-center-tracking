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
public class UnderConstructionProjectDto {

        private Long id;
        private String name;
        private String description;
        private LocalDate startDate;
        private Integer allocatedSprintCount;
        private Integer consumedSprintCount;
        private CustomPhase phase;
        private List<String> milestones = new ArrayList<>();
        private List<String> upcomingRealizations = new ArrayList<>();
        private String type;
        private List<RemarkOrRisk> remarks;
        private String completionPercentage;
        private Squad squad;
        private String status;





}
