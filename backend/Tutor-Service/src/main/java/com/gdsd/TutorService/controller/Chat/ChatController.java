package com.gdsd.TutorService.controller.Chat;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Chat.*;
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

import java.awt.*;
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
                                         @PathVariable Integer tutorId,
                                         @RequestBody StartChatRequestDto startChatRequestDto
                                         ) {

        String jwt = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String studentEmail = tokenProvider.getEmailFromToken(jwt);

        Integer studentId = studentService.getStudentIdFromEmail(studentEmail);

        //if chat between student and tutor already exists then just return the chat id otherwise create
        Map<String, Integer> response = new HashMap<>();
        Integer chatId = null;
        if(chatService.chatExistsByStudentIdAndTutorId(studentId, tutorId)) {
            chatId =  chatService.getChatIdForStudentIdAndTutorId(studentId, tutorId);
            response.put("chatId", chatId);
        } else {
            chatId = chatService.createChat(studentId, tutorId);
            response.put("chatId", chatId);
        }

        //also save the message sent for the first time
        SaveMessageRequestDto saveMessageRequestDto = new SaveMessageRequestDto();
        saveMessageRequestDto.setMessageId(null);
        saveMessageRequestDto.setChatId(chatId);
        saveMessageRequestDto.setSenderId(studentId);
        saveMessageRequestDto.setSenderRole("STUDENT");
        saveMessageRequestDto.setContent(startChatRequestDto.getMessage());
        saveMessageRequestDto.setTimestamp(null);
        chatService.saveMessage(saveMessageRequestDto);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/conversations")
    public ResponseEntity<Map> getConversationsForUser(@RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String role = tokenProvider.getRoleFromToken(token);

        List<ConversationDto> dtos = new ArrayList<>();
        if(role.equals("TUTOR")) {
            String tutorEmail = tokenProvider.getEmailFromToken(token);
            Integer tutorId = tutorService.getTutorIdFromEmail(tutorEmail);
            List<Chat> chatsForTutor = chatService.getChatsForTutor(tutorId);
            dtos = conversations(chatsForTutor, role);
        } else {
            String studentEmail = tokenProvider.getEmailFromToken(token);
            Integer studentId = studentService.getStudentIdFromEmail(studentEmail);
            List<Chat> chatsForStudent = chatService.getChatsForStudent(studentId);
            dtos = conversations(chatsForStudent, role);
        }

        Map<String, List<ConversationDto>> response = new HashMap<>();
        response.put("conversations", dtos);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public List<ConversationDto> conversations(List<Chat> chats, String role) {
        List<ConversationDto> dtos = new ArrayList<>();
            for(Chat chat : chats) {
                ConversationDto dto = new ConversationDto();
                dto.setChatId(chat.getChatId());
                dto.setUserId(chat.getStudentId());
                if (role.equals("TUTOR")) {
                    dto.setName(studentService.getStudentNameFromId(chat.getStudentId()));
                    dto.setProfileImgLink(studentService.getStudentProfileImageFromId(chat.getStudentId()));
                } else {
                    dto.setName(tutorService.getTutorNameFromId(chat.getTutorId()));
                    dto.setProfileImgLink(tutorService.getTutorProfileImageFromId(chat.getStudentId()));
                }

                if(chatService.getLatestMessageForChatId(chat.getChatId()).isPresent()) {
                    Message message = chatService.getLatestMessageForChatId(chat.getChatId()).get();
                    dto.setLastMessageContent(message.getContent());
                    dto.setTimestamp(message.getTimestamp().toString());
                } else {
                    dto.setLastMessageContent("");
                    dto.setTimestamp("");
                }
                dtos.add(dto);
            }

            return dtos;
        }



    @GetMapping("/{chatId}")
    public ResponseEntity<ChatResponseDto> getChatForChatId(@PathVariable Integer chatId,
                                                            @RequestHeader("Authorization") String authorizationHeader) {

        Chat chat = chatService.getChatById(chatId);
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        String role = tokenProvider.getRoleFromToken(token);

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
