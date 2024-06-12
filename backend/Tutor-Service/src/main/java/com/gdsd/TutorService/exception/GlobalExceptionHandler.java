package com.gdsd.TutorService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map> resourceNotFoundException(ResourceNotFoundException ex) {
        String message = ex.getMessage();
        Map<String, String> apiResponse = new HashMap<>();
        apiResponse.put("message", message);

        return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(GenericTutorException.class)
    public ResponseEntity<Map> genericException(GenericTutorException ex) {
        String message = ex.getMessage();
        Map<String, String> apiResponse = new HashMap<>();
        apiResponse.put("message", message);

        return new ResponseEntity<>(apiResponse, ex.getHttpStatus());
    }
}
