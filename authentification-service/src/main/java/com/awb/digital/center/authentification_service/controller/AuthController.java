package com.awb.digital.center.authentification_service.controller;


import com.awb.digital.center.authentification_service.dto.JwtAuthResponse;
import com.awb.digital.center.authentification_service.dto.LoginDto;
import com.awb.digital.center.authentification_service.dto.RegisterDto;
import com.awb.digital.center.authentification_service.dto.RoleDto;
import com.awb.digital.center.authentification_service.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthService authService;

    //Build Register Rest Api
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto){
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    //Build Login Rest api
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto){
        JwtAuthResponse jwtAuthResponse = authService.login(loginDto);
        return new ResponseEntity<>(jwtAuthResponse, HttpStatus.OK);
    }
    //Get All roles
    @GetMapping("/roles")
    public ResponseEntity<List<RoleDto>> getRoles(){
        List<RoleDto> roles = authService.getAllRoles();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

}
