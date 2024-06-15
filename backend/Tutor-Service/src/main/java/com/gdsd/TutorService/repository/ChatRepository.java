package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
    Optional<List<Chat>> findByStudentId(Integer studentId);
    Optional<List<Chat>> findByTutorId(Integer tutorId);
    Boolean existsByStudentIdAndTutorId(Integer studentId, Integer tutorId);
    Optional<Chat> findByStudentIdAndTutorId(Integer studentId, Integer tutorId);
}
