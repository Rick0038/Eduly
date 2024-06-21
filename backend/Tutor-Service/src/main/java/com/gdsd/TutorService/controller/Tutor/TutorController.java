package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorScheduleRequestDto;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tutor")
public class TutorController {

    @Autowired
    private TutorService tutorService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/create")
    public ResponseEntity<String> createTutor(@RequestBody TutorRequestDto tutorRequestDto) {
        String response = tutorService.createTutor(tutorRequestDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/id/{tutorId}")
    public ResponseEntity<TutorResponseDto> getTutorById(@PathVariable Integer tutorId) {
        TutorResponseDto tutor = tutorService.getTutorById(tutorId);
        return new ResponseEntity<>(tutor, HttpStatus.FOUND);
    }

    @DeleteMapping("/id/{tutorId}")
    public ResponseEntity<String> deleteTutorById(@PathVariable Integer tutorId) {
        String response = tutorService.deleteTutorById(tutorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/schedule/session")
    public ResponseEntity<String> addTutorSchedule(@RequestBody TutorScheduleRequestDto tutorScheduleRequestDto,
                                                   @RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer tutorId = tutorService.getTutorIdFromEmail(email);

        tutorService.addTutorSchedule(tutorScheduleRequestDto, tutorId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }


    @PutMapping("/schedule/session/{sessionId}")
    public ResponseEntity<String> updateTutorSchedule(@RequestBody TutorScheduleRequestDto tutorScheduleRequestDto,
                                                      @RequestHeader("Authorization") String authorizationHeader,
                                                      @PathVariable Integer sessionId) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer tutorId = tutorService.getTutorIdFromEmail(email);

        tutorService.updateTutorSchedule(tutorScheduleRequestDto, tutorId, sessionId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
