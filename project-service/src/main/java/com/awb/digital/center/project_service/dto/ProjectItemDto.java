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
public class ProjectItemDto {

    private Long id;
    private String name;
    private String status;
    private CustomPhase phase;
    private Squad squad;
    private LocalDate startDate;
    private LocalDate expectedEndDate;

}
