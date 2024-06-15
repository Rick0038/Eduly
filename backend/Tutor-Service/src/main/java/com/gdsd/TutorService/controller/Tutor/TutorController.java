package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tutor")
public class TutorController {

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


}
