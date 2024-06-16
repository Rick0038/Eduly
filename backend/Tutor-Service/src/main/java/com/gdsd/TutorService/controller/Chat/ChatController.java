package com.gdsd.TutorService.controller.Chat;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.dto.Chat.ConversationDto;
import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
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

    @DeleteMapping("/id/{chatId}")
    public ResponseEntity<String> deleteChatById(@PathVariable Integer chatId) {
        String response = chatService.deleteChatById(chatId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/message/save")
    public ResponseEntity<Message> saveMessage(@RequestBody SaveMessageRequestDto saveMessageRequestDto) {
        Message message = chatService.saveMessage(saveMessageRequestDto);
        return new ResponseEntity<>(message, HttpStatus.OK);

    }

    @GetMapping("/message/chatid/{chatId}")
    public ResponseEntity<List<Message>> getMessagesForChatId(@PathVariable Integer chatId) {
        List<Message> messagesForChatById = chatService.getMessagesForChatById(chatId);
        return new ResponseEntity<>(messagesForChatById, HttpStatus.OK);
    }
}
