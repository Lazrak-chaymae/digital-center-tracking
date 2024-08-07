package com.awb.digital.center.project_service.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "phase")
public class Phase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    @JsonBackReference
    private Project project;

    @OneToMany(mappedBy = "phase", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;

    public <E> Phase(String name, List<Task> task) {
        this.name = name;
        this.tasks = task;
    }
}
