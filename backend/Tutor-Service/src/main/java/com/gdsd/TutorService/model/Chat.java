package com.gdsd.TutorService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "chat")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatId")
    private Integer chatId;

    @Column(name = "studentId")
    private Integer studentId;

    @Column(name = "tutorId")
    private Integer tutorId;

    public Chat() {
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
    }

    @Override
    public String toString() {
        return "Chat{" +
                "chatId=" + chatId +
                ", studentId=" + studentId +
                ", tutorId=" + tutorId +
                '}';
    }
}
