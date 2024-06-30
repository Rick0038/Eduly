package com.gdsd.TutorService.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "forums_question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "askerId")
    private Integer askerId;

    @Column(name = "askerRole", length = 100)
    private String askerRole;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAskerId() {
        return askerId;
    }

    public void setAskerId(Integer askerId) {
        this.askerId = askerId;
    }

    public String getAskerRole() {
        return askerRole;
    }

    public void setAskerRole(String askerRole) {
        this.askerRole = askerRole;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}