package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Integer> {
}
