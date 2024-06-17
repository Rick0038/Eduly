package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Tutor.TutorProfileRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorProfileResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
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


    private TutorService tutorService;

    @Autowired
    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

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
    public ResponseEntity<TutorProfileResponseDto> updateTutorCV(
          @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String tutorEmail = tokenProvider.getEmailFromToken(token);
        Integer tutorId = tutorService.getTutorIdFromEmail(tutorEmail);

        TutorProfileRequestDto requestDto = new TutorProfileRequestDto();
        requestDto.setFile(file);

        TutorProfileResponseDto responseDto = tutorService.updateTutorCV(requestDto, tutorId);
        if (responseDto != null) {
            return  new ResponseEntity<>(responseDto, HttpStatus.OK);
            //return ResponseEntity.ok(responseDto);
        } else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }@PutMapping("/profileImage")
    public ResponseEntity<TutorProfileResponseDto> updateTutorProfileImage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestParam("file") MultipartFile file) {

        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String tutorEmail = tokenProvider.getEmailFromToken(token);
        Integer tutorId = tutorService.getTutorIdFromEmail(tutorEmail);


        TutorProfileRequestDto requestDto = new TutorProfileRequestDto();
        requestDto.setFile(file);

        TutorProfileResponseDto responseDto = tutorService.updateTutorProfileImage(requestDto, tutorId);
        if (responseDto != null) {
            return  new ResponseEntity<>(responseDto, HttpStatus.OK);
        } else {
            return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    }