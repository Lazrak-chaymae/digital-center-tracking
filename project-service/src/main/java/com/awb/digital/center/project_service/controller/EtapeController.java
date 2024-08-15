package com.awb.digital.center.project_service.controller;

import com.awb.digital.center.project_service.dto.EtapeDto;
import com.awb.digital.center.project_service.service.EtapeService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RequestMapping("/api/etapes")
@RestController
public class EtapeController {

    private EtapeService service;

    @GetMapping("/domain/{id}")
    public ResponseEntity<List<EtapeDto>> getAllEtapes(@PathVariable("id") Integer domainId){
       List<EtapeDto> etapes =  service.getAllEtapes(domainId);
       return new ResponseEntity<>(etapes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EtapeDto> createEtape(@RequestBody EtapeDto etapeDto){
        EtapeDto createdEtape =  service.addEtape(etapeDto);
        return new ResponseEntity<>(createdEtape, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EtapeDto> updateEtape(@RequestBody EtapeDto etapeDto, @PathVariable Long id ){
        EtapeDto updatedEtape = service.updateEtape(etapeDto, id);
        return new ResponseEntity<>(updatedEtape, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEtape(@PathVariable Long id){
        service.deleteEtape(id);
        return ResponseEntity.ok("Etape deleted successfully !.");
    }
}
