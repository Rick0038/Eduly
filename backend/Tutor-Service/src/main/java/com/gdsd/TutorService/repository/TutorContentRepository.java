package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.TutorContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorContentRepository extends JpaRepository<TutorContent, Integer> {
    Optional<TutorContent> findByTutorIdAndContentType(Integer tutorId, String contentType);
}
