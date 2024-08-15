package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.Squad;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProjectCreationDto {

    private Long id;
    private Integer domainId;
    private String name;
    private String owner;
    private LocalDate startDate;
    private LocalDate expectedEndDate;
    private String type;
    private String budget;
    private String description;
    private String status;
    private Integer allocatedSprintCount;
    private Squad squad;

}
