package com.awb.digital.center.kpi_business_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="kpi")
public class KpiBusiness {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String functionality;
    private String indicator;
    private Integer planned;
    private Integer achieved;
    private String previousMeasure;
    private String type;

}
