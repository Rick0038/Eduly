package com.gdsd.TutorService.dto.Topic;

import com.gdsd.TutorService.model.Tutor;
import jakarta.persistence.*;

public class TopicRequestDto {
    private Integer tutorId;
    private String topicName;

    public TopicRequestDto() {
    }

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
    }

    public String getTopicName() {
        return topicName;
    }

    public void setTopicName(String topicName) {
        this.topicName = topicName;
    }


}
