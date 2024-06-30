package com.awb.digital.center.technical_debt_service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TechnicalDebtDto {

    private Long id;
    private String title;
    private String type;
    private String impact;
    private String cost;
    private String voluntary;
    private String comment;
}
