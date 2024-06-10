package com.gdsd.StudentService.controller;

import com.gdsd.StudentService.dto.StudentRequestDto;
import com.gdsd.StudentService.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// THIS IS THE PLACE WHERE API WILL HIT 1

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public  StudentController(StudentService studentService){
        this.studentService = studentService;
    }


    // THIS ONE WILL CREATE A USER
    @PostMapping(value = "/create")
    public ResponseEntity<String> createStudent(@RequestBody StudentRequestDto studentRequestDto){
        String response = studentService.createStudent(studentRequestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
