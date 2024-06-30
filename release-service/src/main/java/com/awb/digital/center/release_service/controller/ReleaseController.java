package com.awb.digital.center.release_service.controller;

import com.awb.digital.center.release_service.dto.ReleaseDto;
import com.awb.digital.center.release_service.service.ReleaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/release")
@RestController
public class ReleaseController {

    private ReleaseService service;

    @PostMapping
    public ResponseEntity<ReleaseDto>  addRelease(@RequestBody ReleaseDto releaseDto){
        ReleaseDto release = service.createRelease(releaseDto);
        return new ResponseEntity<>(release, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<ReleaseDto>  updateRelease(@PathVariable Long id, @RequestBody ReleaseDto releaseDto){
        ReleaseDto updatedRelease = service.updateRelease(id, releaseDto);
        return ResponseEntity.ok(updatedRelease);
    }
    @GetMapping
    public ResponseEntity<List<ReleaseDto>> getAllReleases(){
        List<ReleaseDto> releases = service.getAllRelease();
        return ResponseEntity.ok(releases);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRelease(@PathVariable Long id){
        service.deleteRelease(id);
        return ResponseEntity.ok("Release deleted successfully!.");
    }


}
