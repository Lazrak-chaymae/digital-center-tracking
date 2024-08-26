package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.KpiPilotageDto;
import com.awb.digital.center.project_service.service.KpiPilotageService;
import jakarta.ws.rs.Path;
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
    @DeleteMapping("/kpis/{kpiId}")
    public ResponseEntity<String> deleteKpi(@PathVariable Long kpiId){
        kpiPilotageService.deleteKPI(kpiId);
        return ResponseEntity.ok("kpi deleted successfully!.");
    }
    @PatchMapping("/kpis/{kpiId}/name")
    public ResponseEntity<String> updateKpiName(@RequestBody String name,
                                              @PathVariable Long kpiId) {
        kpiPilotageService.updateKPIName(name, kpiId);
        return ResponseEntity.ok("kpi name updated successfully!.");
    }

    @PatchMapping("/kpis/{kpiId}/target")
    public ResponseEntity<String> updateKpiTarget(@RequestBody String target,
                                                @PathVariable Long kpiId) {
        kpiPilotageService.updateKPITarget(target, kpiId);
        return ResponseEntity.ok("kpi target updated successfully!.");
    }

    @PatchMapping("/kpis/{kpiId}/current")
    public ResponseEntity<String> updateKpiCurrent(@RequestBody String current,
                                                 @PathVariable Long kpiId) {
        kpiPilotageService.updateKPICurrent(current, kpiId);
        return ResponseEntity.ok("kpi current updated successfully!.");
    }
}
