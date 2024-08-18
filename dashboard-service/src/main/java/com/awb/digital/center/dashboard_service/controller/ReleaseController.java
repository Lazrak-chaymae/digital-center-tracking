package com.awb.digital.center.dashboard_service.controller;

import com.awb.digital.center.dashboard_service.dto.ReleaseDto;
import com.awb.digital.center.dashboard_service.service.ReleaseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/releases")
@RestController
public class ReleaseController {
    private ReleaseService service;

    @PostMapping
    public ResponseEntity<ReleaseDto> addRelease(@RequestBody ReleaseDto releaseDto){
        ReleaseDto release = service.createRelease(releaseDto);
        return new ResponseEntity<>(release, HttpStatus.CREATED);
    }
    @PutMapping("{id}")
    public ResponseEntity<ReleaseDto>  updateRelease(@PathVariable Long id, @RequestBody ReleaseDto releaseDto){
        ReleaseDto updatedRelease = service.updateRelease(id, releaseDto);
        return ResponseEntity.ok(updatedRelease);
    }
    @GetMapping("/domain/{domainId}")
    public ResponseEntity<List<ReleaseDto>> getAllReleases(@PathVariable Integer domainId){
        List<ReleaseDto> releases = service.getAllReleases(domainId);
        return ResponseEntity.ok(releases);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteRelease(@PathVariable Long id){
        service.deleteRelease(id);
        return ResponseEntity.ok("Release deleted successfully!.");
    }

    @PatchMapping("{id}/installation-date")
    public ResponseEntity<String> updateInstallationDate(@PathVariable Long id, @RequestBody String installationDate){
        service.updateInstallationDate(id, installationDate);
        return ResponseEntity.ok("Installation Date updated successfully!.");
    }
    @PatchMapping("{id}/version")
    public ResponseEntity<String> updateVersion(@PathVariable Long id, @RequestBody String version){
        service.updateVersion(id, version);
        return ResponseEntity.ok("Version updated successfully!.");
    }
    @PatchMapping("{id}/type")
    public ResponseEntity<String> updateType(@PathVariable Long id, @RequestBody String type){
        service.updateType(id, type);
        return ResponseEntity.ok("Type updated successfully!.");
    }
    @PatchMapping("{id}/packages/{index}")
    public ResponseEntity<String> updatePackages(@PathVariable Long id,@PathVariable Integer index, @RequestBody String packages){
        service.updatePackages(id, index, packages);
        return ResponseEntity.ok("Package updated successfully!.");
    }
    @PatchMapping("{id}/hotfix-contents/{index}")
    public ResponseEntity<String> updateHotfixContents(@PathVariable Long id,@PathVariable Integer index, @RequestBody String hotfixContents){
        service.updateHotfixContents(id, index, hotfixContents);
        return ResponseEntity.ok("Hotfix Content updated successfully!.");
    }
    @PatchMapping("{id}/evolution")
    public ResponseEntity<String> updateEvolution(@PathVariable Long id, @RequestBody String evolution){
        service.updateEvolution(id, evolution);
        return ResponseEntity.ok("Evolution updated successfully!.");
    }
}
