package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Optional<List<Chat>> findByStudentEmailId(String studentEmailId);
    Optional<List<Chat>> findByTutorEmailId(String tutorEmailId);
}
