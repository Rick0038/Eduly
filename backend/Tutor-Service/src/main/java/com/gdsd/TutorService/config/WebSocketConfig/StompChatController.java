package com.gdsd.TutorService.config.WebSocketConfig;

import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.dto.Chat.SendMessageResponseDto;
import com.gdsd.TutorService.model.Message;
import com.gdsd.TutorService.service.interf.ChatService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class StompChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private TutorService tutorService;

    @Autowired
    private StudentService studentService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/hello")
    public void sendMessage(WebSocketChatRequestDto webSocketChatRequestDto) {
        SaveMessageRequestDto saveMessageRequestDto = new SaveMessageRequestDto();
        saveMessageRequestDto.setMessageId(null);
        saveMessageRequestDto.setChatId(webSocketChatRequestDto.getChatId());
        saveMessageRequestDto.setSenderId(webSocketChatRequestDto.getSenderId());
        saveMessageRequestDto.setContent(webSocketChatRequestDto.getContent());
        saveMessageRequestDto.setSenderRole(webSocketChatRequestDto.getSenderRole());
        saveMessageRequestDto.setTimestamp(null);

        Message message = chatService.saveMessage(saveMessageRequestDto);

        SendMessageResponseDto responseDto = new SendMessageResponseDto();
        responseDto.setMessageId(message.getMessageId());
        responseDto.setContent(message.getContent());
        responseDto.setTimestamp(message.getTimestamp().toString());
        String senderName = null;
        if(message.getSenderRole().equals("TUTOR")) {
            senderName = tutorService.getTutorNameFromId(message.getSenderId());
        } else {
            senderName = studentService.getStudentNameFromId(message.getSenderId());
        }
        responseDto.setSenderName(senderName);
        responseDto.setSenderId(message.getSenderId());
        responseDto.setSenderRole(message.getSenderRole());

        messagingTemplate.convertAndSend("/topic/" + webSocketChatRequestDto.getChatId(), responseDto);
    }
}
