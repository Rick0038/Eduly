package com.gdsd.TutorService.dto.Chat;

public class SendMessageResponseDto {

    private Integer messageId;
    private String content;
    private String timestamp;
    private String senderName;
    private Integer senderId;
    private String senderRole;

    public SendMessageResponseDto() {
    }

    public Integer getMessageId() {
        return messageId;
    }

    public void setMessageId(Integer messageId) {
        this.messageId = messageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
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
        return "SendMessageResponseDto{" +
                "messageId=" + messageId +
                ", content='" + content + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", senderName='" + senderName + '\'' +
                ", senderId=" + senderId +
                ", senderRole='" + senderRole + '\'' +
                '}';
    }
}
