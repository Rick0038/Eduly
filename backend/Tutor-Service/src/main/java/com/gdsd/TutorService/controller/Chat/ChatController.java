package com.gdsd.TutorService.controller.Chat;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Chat.ChatMessageResponseDto;
import com.gdsd.TutorService.dto.Chat.ChatResponseDto;
import com.gdsd.TutorService.dto.Chat.ConversationDto;
import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Chat;
import com.gdsd.TutorService.model.Message;
import com.gdsd.TutorService.service.interf.ChatService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private StudentService studentService;

    @Autowired
    private TutorService tutorService;

    @PostMapping("/start/{tutorId}")
    public ResponseEntity<Map> startChat(@RequestHeader("Authorization") String authorizationHeader,
                                          @PathVariable Integer tutorId) {

        String jwt = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String studentEmail = tokenProvider.getEmailFromToken(jwt);

        Integer studentId = studentService.getStudentIdFromEmail(studentEmail);

        //if chat between student and tutor already exists then just return the chat id otherwise create
        Map<String, Integer> response = new HashMap<>();
        if(chatService.chatExistsByStudentIdAndTutorId(studentId, tutorId)) {
            Integer chatId =  chatService.getChatIdForStudentIdAndTutorId(studentId, tutorId);
            response.put("chatId", chatId);
        } else {
            Integer chatId = chatService.createChat(studentId, tutorId);
            response.put("chatId", chatId);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/conversations")
    public ResponseEntity<Map> getConversationsForUser(@RequestHeader("Authorization") String authorizationHeader,
                                                                    @RequestParam String role
                                                                    ) {
        List<ConversationDto> dtos = new ArrayList<>();
        if(role.equals("TUTOR")) {
            String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
            String tutorEmail = tokenProvider.getEmailFromToken(token);
            Integer tutorId = tutorService.getTutorIdFromEmail(tutorEmail);
            List<Chat> chatsForTutor = chatService.getChatsForTutor(tutorId);
            for(Chat chat : chatsForTutor) {
                ConversationDto dto = new ConversationDto();
                dto.setChatId(chat.getChatId());
                dto.setUserId(chat.getStudentId());
                dto.setName(studentService.getStudentNameFromId(chat.getStudentId()));
                dto.setProfileImgLink(studentService.getStudentProfileImageFromId(chat.getStudentId()));
                if(chatService.getLatestMessageForChatId(chat.getChatId()).isPresent()) {
                    dto.setLastMessageContent(chatService.getLatestMessageForChatId(chat.getChatId()).get().getContent());
                } else {
                    dto.setLastMessageContent("");
                }
                dtos.add(dto);
            }
        } else {
            String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
            String studentEmail = tokenProvider.getEmailFromToken(token);
            Integer studentId = studentService.getStudentIdFromEmail(studentEmail);
            List<Chat> chatsForStudent = chatService.getChatsForStudent(studentId);
            for(Chat chat : chatsForStudent) {
                ConversationDto dto = new ConversationDto();
                dto.setChatId(chat.getChatId());
                dto.setUserId(chat.getTutorId());
                dto.setName(tutorService.getTutorNameFromId(chat.getTutorId()));
                dto.setProfileImgLink(tutorService.getTutorProfileImageFromId(chat.getStudentId()));
                if(chatService.getLatestMessageForChatId(chat.getChatId()).isPresent()) {
                    dto.setLastMessageContent(chatService.getLatestMessageForChatId(chat.getChatId()).get().getContent());
                } else {
                    dto.setLastMessageContent("");
                }
                dtos.add(dto);
            }
        }

        Map<String, List<ConversationDto>> response = new HashMap<>();
        response.put("conversations", dtos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatResponseDto> getChatForChatId(@PathVariable Integer chatId,
                                                            @RequestHeader("Authorization") String authorizationHeader,
                                                            @RequestParam(required = false) String role) {

        Chat chat = chatService.getChatById(chatId);
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);

        if(role.equals("STUDENT")) {
            Integer studentId = studentService.getStudentIdFromEmail(email);
            if(chat.getStudentId() != studentId) {
                throw new GenericException("Student with email: " + email
                        + " is not related to this chat", HttpStatus.UNAUTHORIZED);
            }
        } else {
            Integer tutorId = tutorService.getTutorIdFromEmail(email);
            if(chat.getTutorId() != tutorId) {
                throw new GenericException("Tutor with email: " + email
                        + " is not related to this chat", HttpStatus.UNAUTHORIZED);
            }
        }

        List<Message> messages = chatService.getMessagesForChatById(chatId);
        List<ChatMessageResponseDto> chatMessages = messages.stream().map(message -> {
            ChatMessageResponseDto chatMessage = new ChatMessageResponseDto();
            chatMessage.setMessageId(message.getMessageId());
            chatMessage.setContent(message.getContent());
            chatMessage.setTimestamp(message.getTimestamp().toString());
            chatMessage.setSenderId(message.getSenderId());
            chatMessage.setSenderRole(message.getSenderRole());
            if (message.getSenderRole().equals("TUTOR")) {
                chatMessage.setSenderName(tutorService.getTutorNameFromId(message.getSenderId()));
            } else {
                chatMessage.setSenderName(studentService.getStudentNameFromId(message.getSenderId()));
            }

            return chatMessage;
        }).collect(Collectors.toList());

        ChatResponseDto response = new ChatResponseDto();
        response.setChatId(chatId);
        response.setMessages(chatMessages);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
