package com.awb.digital.center.dashboard_service.controller;


import com.awb.digital.center.dashboard_service.dto.SupportDto;
import com.awb.digital.center.dashboard_service.service.SupportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/supports")
@RestController
public class SupportController {

    private SupportService supportService;

    @PostMapping
    public ResponseEntity<SupportDto> addSupport(@RequestBody SupportDto supportDto){
        SupportDto savedSupport = supportService.createSupport(supportDto);
        return new ResponseEntity<>(savedSupport, HttpStatus.CREATED);
    }

    @GetMapping("/domain/{domainId}")
    public ResponseEntity<SupportDto> getSupport(@PathVariable Integer domainId){
        SupportDto returnedSupport = supportService.getSupport(domainId);
        return ResponseEntity.ok(returnedSupport);
    }

    @PutMapping("{id}")
    public ResponseEntity<SupportDto> updateSupport(@PathVariable Long id, @RequestBody SupportDto supportDto) {
        SupportDto updatedSupport = supportService.updateSupport(id, supportDto);
        return ResponseEntity.ok(updatedSupport);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSupport(@PathVariable Long id) {
        supportService.deleteSupport(id);
        return ResponseEntity.ok("Support deleted successfully!.");
    }

}
