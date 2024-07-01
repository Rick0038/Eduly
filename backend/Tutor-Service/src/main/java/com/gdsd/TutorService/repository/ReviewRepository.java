package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<List<Review>> findByTutorId(Integer tutorId);
    Optional<List<Review>> findByStudentId(Integer studentId);
    void deleteByStudentId(Integer studentId);
}
