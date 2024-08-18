package com.awb.digital.center.dashboard_service.entity;

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
@Entity
@Table(name = "technical_debt")
public class TechnicalDebt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer domainId;
    private String title;
    private String type;
    private String impact;
    private String cost;
    private String voluntary;

    @ElementCollection
    @CollectionTable(name = "comments", joinColumns = @JoinColumn(name = "debt_id"))
    @Column(name = "name")
    private List<String> comments = new ArrayList<>();
}
