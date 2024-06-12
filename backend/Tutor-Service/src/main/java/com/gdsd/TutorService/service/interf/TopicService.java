package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Topic.TopicRequestDto;
import com.gdsd.TutorService.dto.Topic.TopicResponseDto;

public interface TopicService {
    public String addTopic(TopicRequestDto topicRequestDto);

    public TopicResponseDto getTopicById(Integer topicId);
    public String removeTopicById(Integer topicId);
}
