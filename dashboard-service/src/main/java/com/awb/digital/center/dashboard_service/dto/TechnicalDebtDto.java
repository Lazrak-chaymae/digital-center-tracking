package com.awb.digital.center.dashboard_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TechnicalDebtDto {

    private Long id;
    private String title;
    private String type;
    private String impact;
    private String cost;
    private String voluntary;
    private String comment;
}
