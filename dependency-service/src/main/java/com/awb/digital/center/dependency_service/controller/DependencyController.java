package com.awb.digital.center.dependency_service.controller;

import com.awb.digital.center.dependency_service.dto.DependencyDto;
import com.awb.digital.center.dependency_service.service.DependencyService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/dependency")
@RestController
public class DependencyController {

    private DependencyService service;

    @PostMapping
    public ResponseEntity<DependencyDto> addDependency(@RequestBody DependencyDto dependencyDto){
        DependencyDto dependency = service.createDependency(dependencyDto);
        return new ResponseEntity<>(dependency, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<DependencyDto>> getAllDependencies(){
        List<DependencyDto> dependencies = service.getAllDependency();
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
