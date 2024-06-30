package com.gdsd.TutorService.dto.Forums;

public class QuestionRequestDto {
    private String title;
    private String description;

    public QuestionRequestDto() {
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
}
