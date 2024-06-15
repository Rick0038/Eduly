package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Chat.SaveMessageRequestDto;
import com.gdsd.TutorService.model.Chat;
import com.gdsd.TutorService.model.Message;

import java.util.List;

public interface ChatService {
    Integer createChat(Integer studentId, Integer tutorId);
    Chat getChatById(Integer chatId);
    String deleteChatById(Integer chatId);
    List<Chat> getChatsForStudent(Integer studentId);
    List<Chat> getChatsForTutor(Integer tutorId);
    Message saveMessage(SaveMessageRequestDto saveMessageRequestDto);
    List<Message> getMessagesForChatById(Integer chatId);
    Boolean chatExistsByStudentIdAndTutorId(Integer studentId, Integer tutorId);
    Integer getChatIdForStudentIdAndTutorId(Integer studentId, Integer tutorId);
    Message getLatestMessageForChatId(Integer chatId);
}
