package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.CustomPhaseDto;
import com.awb.digital.center.project_service.service.CustomPhaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RequestMapping("/api/projects/phases")
@RestController
public class CustomPhaseController {

    private CustomPhaseService service;

    @GetMapping
    public ResponseEntity<List<CustomPhaseDto>> getAllPhases(){
       List<CustomPhaseDto> phases =  service.getAllPhases();
       return new ResponseEntity<>(phases, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<CustomPhaseDto> createPhase(@RequestBody CustomPhaseDto phase){
        CustomPhaseDto createdPhase =  service.addPhase(phase);
        return new ResponseEntity<>(createdPhase, HttpStatus.CREATED);
    }
}
