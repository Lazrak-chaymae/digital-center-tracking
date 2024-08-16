package com.awb.digital.center.authentification_service.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserAPIException.class)
    public ResponseEntity<String> handleUserAPIException(UserAPIException exception) {
        return new ResponseEntity<>(exception.getMessage(), exception.getStatus());
    }

}
