package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    Optional<List<Session>> findByTutorIdAndStatusOrderByDateAscStartTimeAsc(Integer tutorId, String status);
}
