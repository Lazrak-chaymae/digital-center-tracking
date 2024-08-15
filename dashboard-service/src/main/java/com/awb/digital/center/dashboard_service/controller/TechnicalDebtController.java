package com.awb.digital.center.dashboard_service.controller;

import com.awb.digital.center.dashboard_service.dto.TechnicalDebtDto;
import com.awb.digital.center.dashboard_service.service.TechnicalDebtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/technical-debts")
@RestController
public class TechnicalDebtController {

    private TechnicalDebtService service;

    @PostMapping
    public ResponseEntity<TechnicalDebtDto> addDebt(@RequestBody TechnicalDebtDto technicalDebtDto){
        TechnicalDebtDto savedDebt = service.createDebt(technicalDebtDto);
        return new ResponseEntity<>(savedDebt, HttpStatus.CREATED);
    }

    @GetMapping("/domain/{domainId}")
    public ResponseEntity<List<TechnicalDebtDto>> getAllDebts(@PathVariable Integer domainId){
        List<TechnicalDebtDto> returnedDebts = service.getAllDebt(domainId);
        return ResponseEntity.ok(returnedDebts);

    }

    @PutMapping("{id}")
    public ResponseEntity<TechnicalDebtDto> updateDebt(@PathVariable Long id, @RequestBody TechnicalDebtDto technicalDebtDto){
        TechnicalDebtDto updatedDebt = service.updateDebt(id,technicalDebtDto);
        return ResponseEntity.ok(updatedDebt);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDebt(@PathVariable Long id){
        service.deleteDebt(id);
        return ResponseEntity.ok("Debt deleted successfully!.");
    }
}
