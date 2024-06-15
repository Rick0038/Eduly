package com.gdsd.TutorService.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "messageId")
    private Integer messageId;

    @Column(name = "chatId")
    private Integer chatId;

    @Column(name = "content")
    private String content;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "senderId")
    private Integer senderId;

    @Column(name = "senderRole")
    private String senderRole;

    public Message() {
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getSenderId() {
        return senderId;
    }

    public void setSenderId(Integer senderId) {
        this.senderId = senderId;
    }

    public String getSenderRole() {
        return senderRole;
    }

    public void setSenderRole(String senderRole) {
        this.senderRole = senderRole;
    }

    @Override
    public String toString() {
        return "Message{" +
                "messageId=" + messageId +
                ", chatId=" + chatId +
                ", timestamp=" + timestamp +
                ", senderId=" + senderId +
                ", senderRole='" + senderRole + '\'' +
                '}';
    }
}
