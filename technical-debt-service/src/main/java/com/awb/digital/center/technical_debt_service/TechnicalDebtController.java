package com.awb.digital.center.technical_debt_service;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/technical-dept")
@RestController
public class TechnicalDebtController {

    private TechnicalDebtService technicalDebtService;

    @PostMapping
    public ResponseEntity<TechnicalDebtDto> addDept(@RequestBody TechnicalDebtDto technicalDebtDto){
       TechnicalDebtDto savedDept = technicalDebtService.createDebt(technicalDebtDto);
       return new ResponseEntity<>(savedDept, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TechnicalDebtDto>> getAllDepts(){
        List<TechnicalDebtDto> returnedDepts = technicalDebtService.getAllDebt();
        return ResponseEntity.ok(returnedDepts);

    }

    @PutMapping("{id}")
    public ResponseEntity<TechnicalDebtDto> updateDept(@PathVariable Long id, @RequestBody TechnicalDebtDto technicalDebtDto){
        TechnicalDebtDto updatedDept = technicalDebtService.updateDebt(id, technicalDebtDto);
        return ResponseEntity.ok(updatedDept);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDept(@PathVariable Long id){
        technicalDebtService.deleteDebt(id);
        return ResponseEntity.ok("Dept deleted successfully!.");
    }
}
