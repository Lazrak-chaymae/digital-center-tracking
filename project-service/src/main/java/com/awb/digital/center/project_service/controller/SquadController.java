package com.awb.digital.center.project_service.controller;


import com.awb.digital.center.project_service.dto.SquadDto;
import com.awb.digital.center.project_service.service.SquadService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/squads")
public class SquadController {

    private SquadService service;

    @GetMapping
    public ResponseEntity<List<SquadDto>> getAllSquads(){
        List<SquadDto> squads = service.GetAllSquads();
        return ResponseEntity.ok(squads);
    }
}
