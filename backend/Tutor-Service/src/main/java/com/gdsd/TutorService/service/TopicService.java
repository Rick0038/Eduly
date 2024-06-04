package com.gdsd.TutorService.service;

import com.gdsd.TutorService.dto.TopicRequestDto;
import com.gdsd.TutorService.dto.TopicResponseDto;
import com.gdsd.TutorService.model.Topic;

public interface TopicService {
    public String addTopic(TopicRequestDto topicRequestDto);

    public TopicResponseDto getTopicById(Integer topicId);
    public String removeTopicById(Integer topicId);
    public String updatePriceById(Double newPrice, Integer topicId);
}
