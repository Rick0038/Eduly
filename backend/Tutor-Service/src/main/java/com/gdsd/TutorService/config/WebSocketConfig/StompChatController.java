package com.gdsd.TutorService.config.WebSocketConfig;

import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.dto.Chat.TestStompMessage;
import com.gdsd.TutorService.model.Message;
import com.gdsd.TutorService.service.interf.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class StompChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/hello")
    public void sendMessage(TestStompMessage message) {
        System.out.println("TestStomMessage: " + message);
        messagingTemplate.convertAndSend("/topic/" + message.getChatId(), message);
    }
}
