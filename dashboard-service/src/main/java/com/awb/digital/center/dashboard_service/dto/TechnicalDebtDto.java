package com.awb.digital.center.dashboard_service.dto;

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
public class TechnicalDebtDto {

    private Long id;
    private Integer domainId;
    private String title;
    private String type;
    private String impact;
    private String cost;
    private String voluntary;
    private List<String> comments= new ArrayList<>();
}
