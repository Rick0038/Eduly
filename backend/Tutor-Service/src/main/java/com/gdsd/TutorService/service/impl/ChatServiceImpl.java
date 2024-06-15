package com.gdsd.TutorService.service.impl;

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
    public Integer createChat(Integer studentId, Integer tutorId) {
        Chat chat = new Chat();
        chat.setStudentId(studentId);
        chat.setTutorId(tutorId);
        chat.setChatId(null);

        tutorRepository.findById(chat.getTutorId())
                        .orElseThrow(() ->
                                new GenericTutorException("Tutor with tutorId: "
                                        + chat.getTutorId() + " not found"
                                        , HttpStatus.NOT_FOUND));

        //Todo if Student with Id not found throw exception

        Chat savedChat = chatRepository.save(chat);
        return savedChat.getChatId();
    }

    @Override
    public Boolean chatExistsByStudentIdAndTutorId(Integer studentId, Integer tutorId) {
        return chatRepository.existsByStudentIdAndTutorId(studentId, tutorId);
    }

    @Override
    public Integer getChatIdForStudentIdAndTutorId(Integer studentId, Integer tutorId) {
        Chat chat = chatRepository.findByStudentIdAndTutorId(studentId, tutorId)
                .orElseThrow(() -> new GenericException("No such chat between student: "
                        + studentId + " and tutor: " + tutorId + " was found",
                        HttpStatus.NOT_FOUND));

        return chat.getChatId();
    }

    @Override
    public Message getLatestMessageForChatId(Integer chatId) {
        Message message = messageRepository.findFirstByChatIdOrderByTimestampDesc(chatId)
                .orElseThrow(() -> new GenericException("No message found for chatId: "
                        + chatId, HttpStatus.NOT_FOUND));

        return message;
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
    public List<Chat> getChatsForStudent(Integer studentId) {
        //Todo Student repository to check if studentId exists
        List<Chat> chats = chatRepository.findByStudentId(studentId)
                .orElseThrow(() ->
                        new GenericException("Unable to retrieve chats for Student with studentId"
                                + studentId, HttpStatus.NOT_FOUND));

        return chats;
    }

    @Override
    public List<Chat> getChatsForTutor(Integer tutorId) {
        tutorRepository.findById(tutorId).orElseThrow(() ->
                new GenericTutorException("Tutor with tutorId: "
                        + tutorId + " not found", HttpStatus.NOT_FOUND));

        List<Chat> chats = chatRepository.findByTutorId(tutorId)
                .orElseThrow(() ->
                        new GenericException("Unable to retrieve chats for tutorId "
                                + tutorId, HttpStatus.NOT_FOUND));


        return chats;
    }

    @Override
    public Message saveMessage(SaveMessageRequestDto saveMessageRequestDto) {
        Message message = modelMapper.map(saveMessageRequestDto, Message.class);
        message.setMessageId(null);
        message.setTimestamp(LocalDateTime.now());

        Chat chat = chatRepository.findById(message.getChatId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Chat", "" +
                                "id", message.getChatId()));

        if((message.getSenderRole().equals("STUDENT")) &&
                !(chat.getStudentId() == message.getSenderId()) ||
                ((message.getSenderRole().equals("TUTOR"))
                        && !(chat.getTutorId() == message.getSenderId()))
        ) {
            throw new GenericException(message.getSenderRole() +" with id " + message.getSenderId()
                    + " is not related to the chat "
                    + chat.getChatId(), HttpStatus.UNAUTHORIZED);
        }

        Message savedMessage = messageRepository.save(message);
        return savedMessage;
    }

    @Override
    public List<Message> getMessagesForChatById(Integer chatId) {
        List<Message> messages = messageRepository.findByChatIdOrderByTimestampAsc(chatId)
                .orElseThrow(() -> new GenericException("Chat with chatId: " + chatId + " not found", HttpStatus.NOT_FOUND));

        return messages;
    }
}
