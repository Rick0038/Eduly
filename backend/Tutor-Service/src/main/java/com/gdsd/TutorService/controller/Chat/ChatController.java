package com.gdsd.TutorService.controller.Chat;

import com.gdsd.TutorService.dto.Chat.ChatCreateRequestDto;
import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.model.Chat;
import com.gdsd.TutorService.model.Message;
import com.gdsd.TutorService.service.interf.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/create")
    public ResponseEntity<String> createChat(@RequestBody ChatCreateRequestDto chatCreateRequestDto) {
        String response = chatService.createChat(chatCreateRequestDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/id/{chatId}")
    public ResponseEntity<String> deleteChatById(@PathVariable Integer chatId) {
        String response = chatService.deleteChatById(chatId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/student/email/{studentEmail}")
    public ResponseEntity<List<Chat>> getChatsForStudentEmail(@PathVariable String studentEmail) {
        List<Chat> chatsForStudent = chatService.getChatsForStudent(studentEmail);
        return new ResponseEntity<>(chatsForStudent, HttpStatus.OK);
    }

    @GetMapping("/tutor/email/{tutorEmail}")
    public ResponseEntity<List<Chat>> getChatsForTutorEmail(@PathVariable String tutorEmail) {
        List<Chat> chatsForTutor = chatService.getChatsForTutor(tutorEmail);
        return new ResponseEntity<>(chatsForTutor, HttpStatus.OK);
    }

    @PostMapping("/message/save")
    public ResponseEntity<String> saveMessage(@RequestBody SaveMessageRequestDto saveMessageRequestDto) {
        String response = chatService.saveMessage(saveMessageRequestDto);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/message/chatid/{chatId}")
    public ResponseEntity<List<Message>> getMessagesForChatId(@PathVariable Integer chatId) {
        List<Message> messagesForChatById = chatService.getMessagesForChatById(chatId);
        return new ResponseEntity<>(messagesForChatById, HttpStatus.OK);
    }
}
