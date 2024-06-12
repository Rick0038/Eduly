package com.gdsd.TutorService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatId")
    private Integer chatId;

    @Column(name = "studentEmailId")
    private String studentEmailId;

    @Column(name = "tutorEmailId")
    private String tutorEmailId;

    public Chat() {
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

    @Override
    public String toString() {
        return "Chat{" +
                "chatId=" + chatId +
                ", studentEmailId='" + studentEmailId + '\'' +
                ", tutorEmailId='" + tutorEmailId + '\'' +
                '}';
    }
}
