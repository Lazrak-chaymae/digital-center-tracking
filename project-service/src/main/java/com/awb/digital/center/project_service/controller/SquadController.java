package com.awb.digital.center.project_service.controller;


import com.awb.digital.center.project_service.dto.SquadDto;
import com.awb.digital.center.project_service.service.SquadService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/squads")
public class SquadController {

    private SquadService service;

    @GetMapping("/domain/{id}")
    public ResponseEntity<List<SquadDto>> getAllSquads(@PathVariable("id") Integer domainId){
        List<SquadDto> squads = service.GetAllSquads(domainId);
        return ResponseEntity.ok(squads);
    }

    @PostMapping
    public ResponseEntity<SquadDto> addSquad(@RequestBody SquadDto squadDto){
        SquadDto squad = service.createSquad(squadDto);
        return new ResponseEntity<>(squad, HttpStatus.CREATED);
    }
}
