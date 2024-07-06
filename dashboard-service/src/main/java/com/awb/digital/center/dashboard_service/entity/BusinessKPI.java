package com.awb.digital.center.dashboard_service.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "business_kpi")
@Entity
public class BusinessKPI {
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
