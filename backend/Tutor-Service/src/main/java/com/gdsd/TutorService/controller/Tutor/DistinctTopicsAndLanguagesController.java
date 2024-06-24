package com.gdsd.TutorService.controller.Tutor;

import com.gdsd.TutorService.repository.TopicRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class DistinctTopicsAndLanguagesController {

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @GetMapping("/topics")
    public ResponseEntity<Map> getTopics(@RequestHeader("Authorization") String authorizationHeader) {
        List<String> distinctTopicNames = topicRepository.findDistinctTopicNames();
        Map<String, List> response = new HashMap<>();
        response.put("topics", distinctTopicNames);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/languages")
    public ResponseEntity<Map> getLangauges() {
        List<String> distinctLanguages = tutorRepository.findDistinctLanguages();
        Map<String, List> response = new HashMap<>();
        response.put("langauges", distinctLanguages);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
