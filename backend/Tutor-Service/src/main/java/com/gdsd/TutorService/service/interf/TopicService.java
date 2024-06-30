package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Topic.TopicRequestDto;
import com.gdsd.TutorService.dto.Topic.TopicResponseDto;

public interface TopicService {
    String addTopic(TopicRequestDto topicRequestDto);

    TopicResponseDto getTopicById(Integer topicId);
    String removeTopicById(Integer topicId);
}
