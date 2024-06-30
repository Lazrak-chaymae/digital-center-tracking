package com.awb.digital.center.release_service.entity;

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
@Table(name="releases")
public class Release {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate installationDate;
    private String version;
    private String type;

    @ElementCollection
    @CollectionTable(name = "packages", joinColumns = @JoinColumn(name = "release_id"))
    @Column(name = "name")
    private List<String> packages = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "hotfix_contents", joinColumns = @JoinColumn(name = "release_id"))
    @Column(name = "name")
    private List<String> hotfixContents = new ArrayList<>();

    private String evolution;
}
