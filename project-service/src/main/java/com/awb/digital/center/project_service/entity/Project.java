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
    @Column(nullable = false)
    private Integer domainId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String owner;
    @Column(nullable = false)
    private LocalDate startDate;
    @Column(nullable = false)
    private LocalDate expectedEndDate;
    private LocalDate actualMepDate;
    private LocalDate lastPhaseDate;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private String status = "EnConstruction";
    @Column(nullable = false)
    private Integer allocatedSprintCount;
    private Integer consumedSprintCount = 0;
    private String completionPercentage = "0%";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "phase_id")
    private CustomPhase phase;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "squad_id")
    private Squad squad;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<KpiPilotage> pilotageKpis;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference("project-task")
    private List<Task> tasks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<RemarkOrRisk> remarks;

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
        if ("pilotage".equalsIgnoreCase(String.valueOf(this.phase.getName())) || "généralisation".equalsIgnoreCase(String.valueOf(this.phase.getName()))) {
            this.status = "EnLancement";
        } else {
            this.status = "EnConstruction";
        }
    }
}
