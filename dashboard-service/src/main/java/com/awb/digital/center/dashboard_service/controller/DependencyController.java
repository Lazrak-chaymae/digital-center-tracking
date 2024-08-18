package com.awb.digital.center.dashboard_service.controller;

import com.awb.digital.center.dashboard_service.dto.DependencyDto;
import com.awb.digital.center.dashboard_service.service.DependencyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RequestMapping("api/dependencies")
@RestController
public class DependencyController {
    private DependencyService service;

    @PostMapping
    public ResponseEntity<DependencyDto> addDependency(@RequestBody DependencyDto dependencyDto){
        DependencyDto dependency = service.createDependency(dependencyDto);
        return new ResponseEntity<>(dependency, HttpStatus.CREATED);
    }
    @GetMapping("/domain/{domainId}")
    public ResponseEntity<List<DependencyDto>> getAllDependencies(@PathVariable Integer domainId){
        List<DependencyDto> dependencies = service.getAllDependencies(domainId);
        return  ResponseEntity.ok(dependencies);
    }
    @PutMapping("{id}")
    public ResponseEntity<DependencyDto> updateDependency(@PathVariable  Long id, @RequestBody DependencyDto dependencyDto){
        DependencyDto updatedDependency = service.updateDependency(id, dependencyDto);
        return ResponseEntity.ok(updatedDependency);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDependency(@PathVariable Long id){
        service.deleteDependency(id);
        return ResponseEntity.ok("Dependency deleted successfully!.");
    }
    @PatchMapping("{id}/title")
    public ResponseEntity<String> updateTitle(@PathVariable Long id,@RequestBody String title){
        service.updateTitle(id, title);
        return ResponseEntity.ok("Title updated successfully!.");
    }
    @PatchMapping("{id}/priority")
    public ResponseEntity<String> updatePriority(@PathVariable Long id,@RequestBody String priority){
        service.updatePriority(id, priority);
        return ResponseEntity.ok("Priority updated successfully!.");
    }
    @PatchMapping("{id}/responsibleTeam")
    public ResponseEntity<String> updateResponsibleTeam(@PathVariable Long id,@RequestBody String responsibleTeam){
        service.updateResponsibleTeam(id, responsibleTeam);
        return ResponseEntity.ok("Responsible Team updated successfully!.");
    }
    @PatchMapping("{id}/beneficiaryTeam")
    public ResponseEntity<String> updateBeneficiaryTeam(@PathVariable Long id,@RequestBody String beneficiaryTeam){
        service.updateBeneficiaryTeam(id, beneficiaryTeam);
        return ResponseEntity.ok("Beneficiary Team updated successfully!.");
    }
    @PatchMapping("{id}/scheduledDate")
    public ResponseEntity<String> updateScheduledDate(@PathVariable Long id, @RequestBody String scheduledDate){
        LocalDate date = LocalDate.parse(scheduledDate);
        service.updateScheduledDate(id, date);
        return ResponseEntity.ok("Scheduled Date updated successfully!.");
    }
}
