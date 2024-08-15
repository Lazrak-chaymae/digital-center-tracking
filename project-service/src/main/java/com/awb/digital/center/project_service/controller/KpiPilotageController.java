package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;
import com.awb.digital.center.project_service.service.KpiPilotageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class KpiPilotageController {

    private KpiPilotageService kpiPilotageService;

    @PostMapping("/{id}/kpis")
    public ResponseEntity<KpiPilotageDto> addKpiForProject(@RequestBody KpiPilotageDto kpiPilotageDto, @PathVariable("id") Long projectId) {
        KpiPilotageDto createdKpi =kpiPilotageService.createKpi(kpiPilotageDto, projectId);
        return new ResponseEntity<>(createdKpi, HttpStatus.CREATED);
    }
}
