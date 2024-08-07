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


}
