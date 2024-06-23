package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Tutor.TutorProfileUpdateRequestDto;
import com.gdsd.TutorService.dto.Tutor.*;
import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorScheduleRequestDto;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/tutor")
public class TutorController {
    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private TutorService tutorService;

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

    @PutMapping("/cv")
    public ResponseEntity<Object> updateTutorCV(
          @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        TutorProfileRequestDto requestDto = new TutorProfileRequestDto();
        requestDto.setFile(file);

        Object responseDto = tutorService.updateTutorContent(requestDto, tutorId, "cv");
        if (responseDto != null) {
            return  new ResponseEntity<>(responseDto, HttpStatus.OK);
            //return ResponseEntity.ok(responseDto);
        } else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/profileImage")
    public ResponseEntity<Object> updateTutorProfileImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        if (file == null || file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        TutorProfileRequestDto requestDto = new TutorProfileRequestDto();
        requestDto.setFile(file);

        Object responseDto = tutorService.updateTutorContent(requestDto, tutorId,"profile_image");
        if (responseDto != null) {
            return new ResponseEntity<>(responseDto,HttpStatus.OK);
        } else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/video")
    public ResponseEntity<Object>updateTutorIntroVide(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);

        TutorProfileRequestDto requestDto = new TutorProfileRequestDto();
        requestDto.setFile(file);

        Object responseDto = tutorService.updateTutorContent(requestDto, tutorId,"intro_video");
        if (responseDto != null) {
            return new ResponseEntity<>(responseDto,HttpStatus.OK);
        } else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/schedule/session")
    public ResponseEntity<String> addTutorSchedule(@RequestBody TutorScheduleRequestDto tutorScheduleRequestDto,
                                                   @RequestHeader("Authorization") String authorizationHeader) {
        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        tutorService.addTutorSchedule(tutorScheduleRequestDto, tutorId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }


    @PutMapping("/schedule/session/{sessionId}")
    public ResponseEntity<String> updateTutorSchedule(@RequestBody TutorScheduleRequestDto tutorScheduleRequestDto,
                                                      @RequestHeader("Authorization") String authorizationHeader,
                                                      @PathVariable Integer sessionId) {
        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        tutorService.updateTutorSchedule(tutorScheduleRequestDto, tutorId, sessionId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateTutorProfile(@RequestBody TutorProfileUpdateRequestDto tutorProfileUpdateRequestDto,
                                                     @RequestHeader("Authorization") String authorizationHeader
                                                     ) {
        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        tutorService.updateTutorProfile(tutorProfileUpdateRequestDto, tutorId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/upcoming-appointments")
    public ResponseEntity<TutorUpcomingAppointmentsResponseDto> getTutorUpcomingAppointments(@RequestHeader("Authorization") String authorizationHeader) {
        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);
        TutorUpcomingAppointmentsResponseDto response = tutorService.getTutorUpcomingAppointments(tutorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<TutorDetailsResponseDto> getTutorProfileForSelf(@RequestHeader("Authorization") String authorizationHeader) {
        Integer tutorId = getTutorIdFromAuthHeader(authorizationHeader);

        TutorDetailsResponseDto response = tutorService.getTutorProfileForSelf(tutorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public Integer getTutorIdFromAuthHeader(String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer tutorId = tutorService.getTutorIdFromEmail(email);

        return tutorId;
    }
}

