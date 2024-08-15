package com.awb.digital.center.dashboard_service.controller;

import com.awb.digital.center.dashboard_service.dto.DependencyDto;
import com.awb.digital.center.dashboard_service.service.DependencyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
