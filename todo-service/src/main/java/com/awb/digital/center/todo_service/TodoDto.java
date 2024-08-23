package com.awb.digital.center.todo_service;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TodoDto {

    private Long id;
    private String name;
    private String detail;
    private LocalDate deadline;
    private String status;
    private Integer projectId;
    private Integer domainId;
    private String userName;
    private String responsible;
}
