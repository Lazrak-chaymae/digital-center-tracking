package com.awb.digital.center.authentification_service.controller;

import com.awb.digital.center.authentification_service.dto.UserDto;
import com.awb.digital.center.authentification_service.repository.UserRepository;
import com.awb.digital.center.authentification_service.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
public class UserController {

    private UserService service;

    @PostMapping("api/user")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto){
        UserDto user = service.createUser(userDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
