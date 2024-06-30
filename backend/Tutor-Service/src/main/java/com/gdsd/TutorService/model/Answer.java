package com.gdsd.TutorService.model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "forums_answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "description")
    private String description;

    @Column(name = "answererId")
    private Integer answererId;

    @Column(name = "answererRole", length = 100)
    private String answererRole;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "questionId")
    private Integer questionId;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAnswererId() {
        return answererId;
    }

    public void setAnswererId(Integer answererId) {
        this.answererId = answererId;
    }

    public String getAnswererRole() {
        return answererRole;
    }

    public void setAnswererRole(String answererRole) {
        this.answererRole = answererRole;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }
}