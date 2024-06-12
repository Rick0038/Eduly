package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Chat.ChatCreateRequestDto;
import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.model.Chat;
import com.gdsd.TutorService.model.Message;

import java.util.List;

public interface ChatService {
    String createChat(ChatCreateRequestDto chatCreateRequestDto);
    Chat getChatById(Integer chatId);
    String deleteChatById(Integer chatId);
    List<Chat> getChatsForStudent(String studentEmailId);
    List<Chat> getChatsForTutor(String tutorEmailId);
    String saveMessage(SaveMessageRequestDto saveMessageRequestDto);
    List<Message> getMessagesForChatById(Integer chatId);
}
