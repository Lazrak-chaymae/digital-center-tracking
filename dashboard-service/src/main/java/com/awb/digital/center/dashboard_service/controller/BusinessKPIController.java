package com.awb.digital.center.dashboard_service.controller;


import com.awb.digital.center.dashboard_service.dto.BusinessKPIDto;
import com.awb.digital.center.dashboard_service.service.BusinessKPIService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/business-kpis")
@RestController
public class BusinessKPIController {

    private BusinessKPIService service;

    @PostMapping
    public ResponseEntity<BusinessKPIDto> addKpi(@RequestBody BusinessKPIDto businessKPIDto){
        BusinessKPIDto savedApi = service.createKpi(businessKPIDto);
        return new ResponseEntity<>(savedApi, HttpStatus.CREATED);
    }

    @GetMapping("/domain/{domainId}/type/{type}")
    public ResponseEntity<List<BusinessKPIDto>> getAllKpis(@PathVariable String type, @PathVariable Integer domainId){
        List<BusinessKPIDto> returnedApi = service.getAllKpiByTypeAndDomain(type, domainId);
        return ResponseEntity.ok(returnedApi);
    }

    @PutMapping("{id}")
    public ResponseEntity<BusinessKPIDto> updateKpi(@PathVariable Long id,@RequestBody BusinessKPIDto businessKPIDto) {
        BusinessKPIDto updatedKpi = service.updateKpi(id, businessKPIDto);
        return ResponseEntity.ok(updatedKpi);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteKpi(@PathVariable Long id) {
        service.deleteKpi(id);
        return ResponseEntity.ok("Kpi deleted successfully!.");
    }
    @PatchMapping("{id}/functionality")
    public ResponseEntity<String> updateFunctionality(@PathVariable Long id, @RequestBody String functionality){
        service.updateFunctionality(id, functionality);
        return ResponseEntity.ok("Functionality updated successfully!.");

    }
    @PatchMapping("{id}/indicator")
    public ResponseEntity<String> updateIndicator(@PathVariable Long id, @RequestBody String indicator){
        service.updateIndicator(id, indicator);
        return ResponseEntity.ok("Indicator updated successfully!.");

    }
    @PatchMapping("{id}/planned")
    public ResponseEntity<String> updatePlanned(@PathVariable Long id, @RequestBody String planned){
        service.updatePlanned(id, planned);
        return ResponseEntity.ok("Planned updated successfully!.");
    }
    @PatchMapping("{id}/achieved")
    public ResponseEntity<String> updateAchieved(@PathVariable Long id, @RequestBody String achieved){
        service.updateAchieved(id, achieved);
        return ResponseEntity.ok("Achieved updated successfully!.");
    }
    @PatchMapping("{id}/previous-measure")
    public ResponseEntity<String> updatePreviousMeasure(@PathVariable Long id, @RequestBody String previousMeasure){
        service.updatePreviousMeasure(id, previousMeasure);
        return ResponseEntity.ok("Previous Measure updated successfully!.");
    }

}
