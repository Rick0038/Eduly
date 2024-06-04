package com.gdsd.TutorService.controller;

import com.gdsd.TutorService.dto.TopicRequestDto;
import com.gdsd.TutorService.dto.TopicResponseDto;
import com.gdsd.TutorService.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/topic")
public class TopicController {

    @Autowired
    private TopicService topicService;

    @PostMapping("/create")
    public ResponseEntity<String> addTopic(@RequestBody TopicRequestDto topicRequestDto) {
        String response = topicService.addTopic(topicRequestDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/id/{topicId}")
    public ResponseEntity<TopicResponseDto> getTopicById(@PathVariable Integer topicId) {
        TopicResponseDto topicResponseDto = topicService.getTopicById(topicId);
        return new ResponseEntity<>(topicResponseDto, HttpStatus.FOUND);
    }

    @DeleteMapping("/id/{topicId}")
    public ResponseEntity<String> removeTopicById(@PathVariable Integer topicId) {
        String response = topicService.removeTopicById(topicId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/price/{price}/id/{topicId}")
    public ResponseEntity<String> updatePriceById(@PathVariable Double price,
                                                  @PathVariable Integer topicId) {
        String response = topicService.updatePriceById(price, topicId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
