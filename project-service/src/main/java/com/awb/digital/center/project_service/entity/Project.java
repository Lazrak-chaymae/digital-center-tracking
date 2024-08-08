package com.awb.digital.center.project_service.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String budget;
    private String type;
    private String progress;
    private String description;
    private String status = "EnConstruction";
    private Integer allocatedSprintCount;
    private Integer consumedSprintCount;
    private String completionPercentage;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "phase_id")
    private CustomPhase phase;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "squad_id")
    private Squad squad;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<KpiPilotage> pilotageKpis;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Phase> phases;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
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

    public void setPhase(CustomPhase phase) {
        this.phase = phase;
        updateStatusBasedOnPhase();
    }

    private void updateStatusBasedOnPhase() {
        if ("pilotage".equalsIgnoreCase(String.valueOf(this.phase.getName())) || "generalisation".equalsIgnoreCase(String.valueOf(this.phase.getName()))) {
            this.status = "EnLancement";
        } else {
            this.status = "EnConstruction";
        }
    }
}
