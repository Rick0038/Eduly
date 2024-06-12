package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.dto.Chat.ChatCreateRequestDto;
import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.exception.GenericTutorException;
import com.gdsd.TutorService.exception.ResourceNotFoundException;
import com.gdsd.TutorService.model.Chat;
import com.gdsd.TutorService.model.Message;
import com.gdsd.TutorService.repository.ChatRepository;
import com.gdsd.TutorService.repository.MessageRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public String createChat(ChatCreateRequestDto chatCreateRequestDto) {
        //Todo if Student with Email not found throw exception
        Chat chat = modelMapper.map(chatCreateRequestDto, Chat.class);
        chat.setChatId(null);

        tutorRepository.findByEmail(chat.getTutorEmailId())
                        .orElseThrow(() ->
                                new GenericTutorException("Tutor with emailId: "
                                        + chat.getTutorEmailId() + " not found"
                                        , HttpStatus.NOT_FOUND));

        chatRepository.save(chat);
        return "New Chat " + chat + "created successfully";
    }

    @Override
    public Chat getChatById(Integer chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId));

        return chat;
    }

    @Override
    public String deleteChatById(Integer chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId));

        chatRepository.delete(chat);
        return "Chat " + chat + " deleted successfully";
    }

    @Override
    public List<Chat> getChatsForStudent(String studentEmailId) {
        //Todo Student repository to check if studentemail exists
        List<Chat> chats = chatRepository.findByStudentEmailId(studentEmailId)
                .orElseThrow(() ->
                        new GenericException("Unable to retrieve chats for "
                                + studentEmailId, HttpStatus.NOT_FOUND));

        return chats;
    }

    @Override
    public List<Chat> getChatsForTutor(String tutorEmailId) {
        tutorRepository.findByEmail(tutorEmailId).orElseThrow(() ->
                new GenericTutorException("Tutor with emailId: "
                        + tutorEmailId + " not found", HttpStatus.NOT_FOUND));

        List<Chat> chats = chatRepository.findByTutorEmailId(tutorEmailId)
                .orElseThrow(() ->
                        new GenericException("Unable to retrieve chats for "
                                + tutorEmailId, HttpStatus.NOT_FOUND));


        return chats;
    }

    @Override
    public String saveMessage(SaveMessageRequestDto saveMessageRequestDto) {
        Message message = modelMapper.map(saveMessageRequestDto, Message.class);
        message.setMessageId(null);
        message.setTimestamp(LocalDateTime.now());

        Chat chat = chatRepository.findById(message.getChatId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Chat", "" +
                                "id", message.getChatId()));

        if(!(chat.getStudentEmailId().equals(message.getSenderEmailId())) &&
                !(chat.getTutorEmailId().equals(message.getSenderEmailId()))) {
            throw new GenericException("Sender with email " + message.getSenderEmailId()
                    + " is not related to the chat "
                    + chat.getChatId(), HttpStatus.UNAUTHORIZED);
        }

        messageRepository.save(message);
        return "Message " + message + " successfully saved";
    }

    @Override
    public List<Message> getMessagesForChatById(Integer chatId) {
        List<Message> messages = messageRepository.findByChatIdOrderByTimestampAsc(chatId)
                .orElseThrow(() -> new GenericException("Chat with chatId: " + chatId + " not found", HttpStatus.NOT_FOUND));

        return messages;
    }
}
