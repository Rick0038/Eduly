package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    Optional<List<Message>> findByChatIdOrderByTimestampAsc(Integer chatId);
    Optional<Message> findFirstByChatIdOrderByTimestampDesc(Integer chatId);
}
