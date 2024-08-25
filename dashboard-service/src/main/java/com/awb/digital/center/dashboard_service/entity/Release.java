package com.awb.digital.center.dashboard_service.entity;


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
@Table(name = "releases")
@Entity
public class Release {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer domainId;
    private LocalDate installationDate;
    private String version;
    private String type;

    @Lob
    @Column(name = "packages", columnDefinition = "TEXT")
    private String packages ;

    @Lob
    @Column(name = "hotfixContents", columnDefinition = "TEXT")
    private String hotfixContents ;

    private String evolution;
}
