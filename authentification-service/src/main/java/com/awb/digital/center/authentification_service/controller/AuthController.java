package com.awb.digital.center.authentification_service.controller;


import com.awb.digital.center.authentification_service.dto.*;
import com.awb.digital.center.authentification_service.repository.UserRepository;
import com.awb.digital.center.authentification_service.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;



    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<RoleDto>> getRoles(){
        List<RoleDto> roles = authService.getAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }
    @GetMapping("/domains")
    public ResponseEntity<List<DomainDto>> getDomains(){
        List<DomainDto> domains = authService.getAllDomains();
        return new ResponseEntity<>(domains, HttpStatus.OK);
    }


}
