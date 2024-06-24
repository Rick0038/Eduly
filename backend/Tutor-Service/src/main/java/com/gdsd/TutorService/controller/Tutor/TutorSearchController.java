package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import com.gdsd.TutorService.repository.SessionRepository;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tutor")
public class TutorSearchController {

    @Autowired
    private TutorService tutorService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SessionRepository sessionRepository;

    @GetMapping("/search")
    public ResponseEntity<Map> searchTutors(@RequestParam(required = false) Double pricingMin,
                                            @RequestParam(required = false) Double pricingMax,
                                            @RequestParam(required = false) Double ratingsMin,
                                            @RequestParam(required = false) String topic,
                                            @RequestParam(required = false) String language,
                                            @RequestParam(required = false) Integer experienceMin,
                                            @RequestParam(required = false) List<String> availabilityDays,
                                            @RequestParam(required = false) String startTime,
                                            @RequestParam(required = false) String endTime
                                            ) {

        List<TutorSearchResponseDto> tutorSearchResponseDtos = tutorService.search(pricingMin, pricingMax,
                ratingsMin, topic, language, experienceMin);

        if(availabilityDays != null && !availabilityDays.isEmpty()) {
            tutorSearchResponseDtos = tutorService.filterTutorDtosByDays(tutorSearchResponseDtos, availabilityDays);
        }

        if(startTime != null) {
            tutorSearchResponseDtos = tutorService.filterTutorDtosByStartTime(tutorSearchResponseDtos, startTime);
        }

        if(endTime != null) {
            tutorSearchResponseDtos = tutorService.filterTutorDtosByEndTime(tutorSearchResponseDtos, endTime);
        }

        Map<String, List<TutorSearchResponseDto>> response = new HashMap<>();
        response.put("tutors", tutorSearchResponseDtos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
