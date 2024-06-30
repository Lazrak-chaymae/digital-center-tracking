package com.awb.digital.center.support_service.controller;

import com.awb.digital.center.support_service.dto.TopSubjectDto;
import com.awb.digital.center.support_service.service.TopSubjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RequestMapping("api/top-subject")
@RestController
public class TopSubjectController {

    private TopSubjectService topSubjectService;

    @PostMapping
    public ResponseEntity<TopSubjectDto> addSubject(@RequestBody TopSubjectDto topSubjectDto){
        TopSubjectDto savedSubject = topSubjectService.createTopSubject(topSubjectDto);
        return new ResponseEntity<>(savedSubject, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TopSubjectDto>> getAllSubjects(){
        List<TopSubjectDto> returnedSubject = topSubjectService.getAllTopSubject();
        return ResponseEntity.ok(returnedSubject);
    }

    @PutMapping("{id}")
    public ResponseEntity<TopSubjectDto> updateSubject(@PathVariable Long id,@RequestBody TopSubjectDto topSubjectDto) {
        TopSubjectDto updatedSubject = topSubjectService.updateTopSubject(id, topSubjectDto);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSubject(@PathVariable Long id) {
        topSubjectService.deleteTopSubject(id);
        return ResponseEntity.ok("Subject deleted successfully!.");
    }

}
