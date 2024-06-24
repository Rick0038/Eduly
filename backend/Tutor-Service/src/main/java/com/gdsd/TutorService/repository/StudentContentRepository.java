package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.model.StudentContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentContentRepository extends JpaRepository<StudentContent, Integer> {
    Optional<StudentContent> findByStudentIdAndContentType(Integer studentId, String contentType);
}
