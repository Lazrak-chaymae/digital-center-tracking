package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.RemarkOrRiskDto;
import com.awb.digital.center.project_service.service.RemarkOrRiskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/projects")
public class RemarkOrRiskController {

    RemarkOrRiskService service;

    @PostMapping("/{id}/remarks")
    public ResponseEntity<RemarkOrRiskDto> createRemarkOrRiskForProject(@RequestBody RemarkOrRiskDto remarkOrRiskDto, @PathVariable("id") Long projectId){
        RemarkOrRiskDto remarkOrRisk = service.createRemarkOrRisk(remarkOrRiskDto,projectId);
        return new ResponseEntity<>(remarkOrRisk, HttpStatus.CREATED);
    }
    @DeleteMapping("/remarks/{id}")
    public ResponseEntity<String> deleteRemarkOrRisk(@PathVariable Long id){
        service.deleteRemarkOrRisk(id);
        return ResponseEntity.ok("Remark or risk deleted successfully!.");
    }

    @PatchMapping("/remarks/{id}/name")
    public ResponseEntity<String> updateRemarkOrRiskName(@RequestBody String name,
                                                 @PathVariable Long id) {
        service.updateRemarkOrRiskName(name, id);
        return ResponseEntity.ok("Remark or risk name updated successfully!.");
    }

    @PatchMapping("/remarks/{id}/importance")
    public ResponseEntity<String> updateRemarkOrRiskImportance(@RequestBody String importance,
                                                       @PathVariable Long id) {
        service.updateRemarkOrRiskImportance(importance, id);
        return ResponseEntity.ok("Remark or risk importance updated successfully!.");
    }


}
