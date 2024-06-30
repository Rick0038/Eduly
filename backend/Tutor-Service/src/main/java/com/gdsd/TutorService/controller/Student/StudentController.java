package com.gdsd.TutorService.controller.Student;


import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Student.StudentResponceDto;
import com.gdsd.TutorService.service.interf.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// THIS IS THE PLACE WHERE API WILL HIT 1

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private StudentService studentService;


//    @GetMapping("/id/{studentId}")
//    public ResponseEntity<StudentResponceDto> getStudentById(@PathVariable Integer studentId){
//        StudentResponceDto student = studentService.getStudentById(studentId);
//        return  new ResponseEntity<>(student,HttpStatus.OK);
//    }

    @GetMapping("/id/{studentId}")
    public ResponseEntity<StudentResponceDto> getStudent(@RequestHeader("Authorization") String authorizationHeader, @PathVariable String studentId){
        String token=tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email=tokenProvider.getEmailFromToken(token);
        Integer studentIdInt=studentService.getStudentIdFromEmail(email);
        studentService.getStudentById(studentIdInt);
        return new ResponseEntity<>(studentService.getStudentById(studentIdInt),HttpStatus.OK);
    }


}
