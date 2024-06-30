package com.gdsd.TutorService.controller.Forums;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Forums.AnswerRequestDto;
import com.gdsd.TutorService.dto.Forums.QuestionRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorScheduleRequestDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.service.interf.ForumService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/forums")
public class ForumsSecuredController {

    @Autowired
    private ForumService forumService;
    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private StudentService studentService;

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody QuestionRequestDto questionRequestDto,
                                              @RequestHeader("Authorization") String authorizationHeader) {

        Map<String, Integer> roleAndId = getIdAndRoleFromAuthHeader(authorizationHeader);
        Integer askerId = null;
        String askerRole = null;
        for(Map.Entry<String, Integer> entry : roleAndId.entrySet()) {
            askerId = entry.getValue();
            askerRole = entry.getKey();
        }
        forumService.askQuestion(askerId, askerRole, questionRequestDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping("/answer/{questionId}")
    public ResponseEntity<String> answerQuestion(@RequestBody AnswerRequestDto answerRequestDto,
                                                 @RequestHeader("Authorization") String authorizationHeader,
                                                 @PathVariable Integer questionId) {
        Map<String, Integer> roleAndId = getIdAndRoleFromAuthHeader(authorizationHeader);
        Integer answererId = null;
        String answererRole = null;
        for(Map.Entry<String, Integer> entry : roleAndId.entrySet()) {
            answererId = entry.getValue();
            answererRole = entry.getKey();
        }
        forumService.answerQuestion(answererId, answererRole, questionId, answerRequestDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    public Map<String, Integer> getIdAndRoleFromAuthHeader(String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        String role = tokenProvider.getRoleFromToken(token);
        Map<String, Integer> roleAndId = new HashMap<>();

        if(role.equalsIgnoreCase("tutor")) {
            roleAndId.put("TUTOR", tutorService.getTutorIdFromEmail(email));
        } else if (role.equalsIgnoreCase("student")) {
            roleAndId.put("STUDENT", studentService.getStudentIdFromEmail(email));
        } else {
            throw new GenericException("Given role is invalid or unauthorized for this action.", HttpStatus.UNAUTHORIZED);
        }

        return roleAndId;
    }
}
