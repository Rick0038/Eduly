package com.gdsd.TutorService.controller.Student;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth/v1/student")
public class StudentController {

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<Student> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        // Fetch the student's profile based on the email
        Student student = studentService.getStudentByEmail(email);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    @DeleteMapping("/profile")
    public ResponseEntity<Void> deleteProfile(@RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        // Delete the student's profile based on the email
        studentService.deleteStudentByEmail(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
