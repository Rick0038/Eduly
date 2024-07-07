package com.gdsd.TutorService.controller.Student;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Student.*;
import com.gdsd.TutorService.model.Session;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    @Autowired
    private StudentServiceImpl studentService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileDto> getProfile(@RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        // Fetch the student's profile based on the email
        StudentProfileDto profile = studentService.getStudentProfile(email);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @DeleteMapping("/profile")
    public ResponseEntity<Void> deleteProfile(@RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        // Delete the student's profile based on the email
        studentService.deleteStudentByEmail(email);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/profileImage")
    public  ResponseEntity<StudentProfileRespDto> uploadProfileImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Integer studentId = getStudentIdFromAuthHeader(authorizationHeader);
        StudentProfileImageRequestDto studentProfileImageRequestDto = new StudentProfileImageRequestDto();
        studentProfileImageRequestDto.setFile(file);
        StudentProfileRespDto responseDto =  studentService.updateStudentProfileImage(studentProfileImageRequestDto,studentId);
        if (responseDto!=null){
            return new ResponseEntity<>(responseDto,HttpStatus.OK);
        }else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/profile")
    public ResponseEntity<Student> updateStudentProfile(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody StudentProfileUpdateRequestDto studentProfileUpdateRequest) {

        Integer studentId = getStudentIdFromAuthHeader(authorizationHeader);
        Boolean updatedStudent = studentService.updateStudentProfile(studentId, studentProfileUpdateRequest);
        if (updatedStudent) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/book/{sessionId}")
    public ResponseEntity<String> bookSession(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer sessionId) {

        Integer studentId = getStudentIdFromAuthHeader(authorizationHeader);
        Session updatedSession = studentService.bookSession(sessionId, studentId);
        if (updatedSession != null) {
            return new ResponseEntity<>("success", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/cancel/{sessionId}")
    public ResponseEntity<SessionCancellationResponseDto> cancelSession(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Integer sessionId) {

        Integer studentId = getStudentIdFromAuthHeader(authorizationHeader);
        SessionCancellationResponseDto responseDto = studentService.cancelSession(sessionId, studentId);
        if (responseDto != null) {
            return new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    public Integer getStudentIdFromAuthHeader(String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);

        return studentService.getStudentIdFromEmail(email);
    }

}
