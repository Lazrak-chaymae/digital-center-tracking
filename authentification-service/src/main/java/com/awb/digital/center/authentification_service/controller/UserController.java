package com.awb.digital.center.authentification_service.controller;

import com.awb.digital.center.authentification_service.dto.ChangePasswordDto;
import com.awb.digital.center.authentification_service.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class UserController {

    private UserService userService;

    @PatchMapping("/change-password")
    public ResponseEntity<?> completeTodo(@RequestBody ChangePasswordDto changePasswordDto){
        try {
            userService.updateUserPassword(changePasswordDto);
            return new ResponseEntity<>("Password updated successfully!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
