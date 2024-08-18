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

    @PatchMapping("{id}/title")
    public ResponseEntity<String> updateTitle(@PathVariable Long id,@RequestBody String title){
        service.updateTitle(id, title);
        return ResponseEntity.ok("Title updated successfully!.");
    }
    @PatchMapping("{id}/type")
    public ResponseEntity<String> updateType(@PathVariable Long id,@RequestBody String type){
        service.updateType(id, type);
        return ResponseEntity.ok("Type updated successfully!.");

    }
    @PatchMapping("{id}/impact")
    public ResponseEntity<String> updateImpact(@PathVariable Long id,@RequestBody String impact){
        service.updateImpact(id, impact);
        return ResponseEntity.ok("Impact updated successfully!.");
    }
    @PatchMapping("{id}/cost")
    public ResponseEntity<String> updateCost(@PathVariable Long id,@RequestBody String cost){
        service.updateCost(id, cost);
        return ResponseEntity.ok("Cost updated successfully!.");
    }
    @PatchMapping("{id}/voluntary")
    public ResponseEntity<String> updateVoluntary(@PathVariable Long id,@RequestBody String voluntary){
        service.updateVoluntary(id, voluntary);
        return ResponseEntity.ok("Voluntary updated successfully!.");
    }
    @PatchMapping("{id}/comments/{index}")
    public ResponseEntity<String> updateComments(@PathVariable Long id, @PathVariable Integer index, @RequestBody String comment){
        service.updateComments(id, index, comment);
        return ResponseEntity.ok("Comment updated successfully!.");
    }


}
