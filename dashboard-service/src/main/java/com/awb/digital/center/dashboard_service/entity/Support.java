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
@Table(name = "support")
public class Support {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer ticketCount;
    private String effortSpent;

    @ElementCollection
    @CollectionTable(name = "top_subjects", joinColumns = @JoinColumn(name = "support_id"))
    @Column(name = "name")
    private List<String> topSubjects = new ArrayList<>();

}
