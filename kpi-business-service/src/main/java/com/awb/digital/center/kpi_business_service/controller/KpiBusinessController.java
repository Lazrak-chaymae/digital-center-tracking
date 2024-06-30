package com.awb.digital.center.kpi_business_service.controller;

import com.awb.digital.center.kpi_business_service.dto.KpiBusinessDto;
import com.awb.digital.center.kpi_business_service.service.KpiBusinessService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/businesskpis")
@AllArgsConstructor
@RestController
public class KpiBusinessController {

    private KpiBusinessService kpiBusinessService;

    @PostMapping
    public ResponseEntity<KpiBusinessDto> addKpi(@RequestBody KpiBusinessDto kpiBusinessDto){
        KpiBusinessDto savedApi = kpiBusinessService.createKpi(kpiBusinessDto);
        return new ResponseEntity<>(savedApi, HttpStatus.CREATED);
    }

    @GetMapping("{type}")
    public ResponseEntity<List<KpiBusinessDto>> getAllKpis(@PathVariable String type){
        List<KpiBusinessDto> returnedApi = kpiBusinessService.getAllKpiByType(type);
        return ResponseEntity.ok(returnedApi);
    }

    @PutMapping("{id}")
    public ResponseEntity<KpiBusinessDto> updateKpi(@PathVariable Long id,@RequestBody KpiBusinessDto kpiBusinessDto) {
        KpiBusinessDto updatedKpi = kpiBusinessService.updateKpi(id, kpiBusinessDto);
        return ResponseEntity.ok(updatedKpi);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteKpi(@PathVariable Long id) {
        kpiBusinessService.deleteKpi(id);
        return ResponseEntity.ok("Kpi deleted successfully!.");
    }


}
