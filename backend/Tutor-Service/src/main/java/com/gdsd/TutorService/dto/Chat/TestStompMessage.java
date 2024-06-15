package com.gdsd.TutorService.dto.Chat;

public class TestStompMessage {

    String sender;
    String message;
    String chatId;

    public TestStompMessage() {
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId;
    }

    @Override
    public String toString() {
        return "TestStompMessage{" +
                "sender='" + sender + '\'' +
                ", message='" + message + '\'' +
                ", chatId='" + chatId + '\'' +
                '}';
    }
}
