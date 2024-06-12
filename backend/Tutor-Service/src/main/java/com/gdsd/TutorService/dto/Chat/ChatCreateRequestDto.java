package com.gdsd.TutorService.dto.Chat;

public class ChatCreateRequestDto {
    private Integer chatId;
    private String studentEmailId;
    private String tutorEmailId;

    public ChatCreateRequestDto() {
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public String getStudentEmailId() {
        return studentEmailId;
    }

    public void setStudentEmailId(String studentEmailId) {
        this.studentEmailId = studentEmailId;
    }

    public String getTutorEmailId() {
        return tutorEmailId;
    }

    public void setTutorEmailId(String tutorEmailId) {
        this.tutorEmailId = tutorEmailId;
    }
}
