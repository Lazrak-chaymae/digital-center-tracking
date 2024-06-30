package com.awb.digital.center.release_service.dto;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.JoinColumn;
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
public class ReleaseDto {

    private Long id;

    private LocalDate installationDate;
    private String version;
    private String type;
    private List<String> packages = new ArrayList<>();
    private List<String> hotfixContents = new ArrayList<>();
    private String evolution;

}
