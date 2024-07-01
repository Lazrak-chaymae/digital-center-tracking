package com.awb.digital.center.project_service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String owner;
    private LocalDate startDate;
    private LocalDate expectedEndDate;
    private LocalDate actualMepDate;
    private LocalDate lastPhaseDate;
    private String phase;
    private String type;
    private String budget;
    private Float consumed;
    private String progress;
    private String description;
    private String status;
    private Integer allocatedSprintCount;
    private Integer consumedSprintCount;
    private String completionPercentage;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "squad_id")
    private Squad squad;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<KpiPilotage> pilotageKpis;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Phase> phases;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<RemarkOrRisk> remarks;

    @ElementCollection
    @CollectionTable(name = "kpis", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "name")
    private List<String> kpis = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "milestones", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "name")
    private List<String> milestones = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "realizations", joinColumns = @JoinColumn(name = "project_id"))
    @Column(name = "name")
    private List<String> upcomingRealizations = new ArrayList<>();


}
