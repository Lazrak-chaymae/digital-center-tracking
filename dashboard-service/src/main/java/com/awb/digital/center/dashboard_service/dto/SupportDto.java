package com.awb.digital.center.dashboard_service.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SupportDto {

    private Long id;
    private Integer ticketCount;
    private String effortSpent;
    private List<String> topSubjects = new ArrayList<>();
}
