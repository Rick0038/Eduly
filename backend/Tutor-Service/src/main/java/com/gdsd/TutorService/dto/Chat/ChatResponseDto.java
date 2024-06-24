package com.gdsd.TutorService.dto.Chat;

import java.util.List;

public class ChatResponseDto {
    private Integer chatId;
    private List<ChatMessageResponseDto> messages;

    public ChatResponseDto() {
    }

    public Integer getChatId() {
        return chatId;
    }

    public void setChatId(Integer chatId) {
        this.chatId = chatId;
    }

    public List<ChatMessageResponseDto> getMessages() {
        return messages;
    }

    public void setMessages(List<ChatMessageResponseDto> messages) {
        this.messages = messages;
    }
}
