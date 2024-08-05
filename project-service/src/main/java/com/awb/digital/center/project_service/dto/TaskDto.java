package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.Project;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TaskDto {

    private Long id;
    private String name;
    private String progress;
    private Phase phase;
    private Project project;
}
