package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.Phase;
import com.awb.digital.center.project_service.entity.Project;
import com.awb.digital.center.project_service.entity.Task;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PhaseDto {

    private Long id;
    private String name;
    private Project project;
    private List<Task> tasks;
}
