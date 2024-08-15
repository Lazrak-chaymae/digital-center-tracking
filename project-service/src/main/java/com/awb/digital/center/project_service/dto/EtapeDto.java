package com.awb.digital.center.project_service.dto;

import com.awb.digital.center.project_service.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EtapeDto {

    private Long id;
    private String name;
    private Integer domainId;
    private List<Task> tasks;
}
