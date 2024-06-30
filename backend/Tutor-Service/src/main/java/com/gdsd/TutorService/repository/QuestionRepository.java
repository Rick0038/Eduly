package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrderByTimestampDesc(String titleKeyword, String descriptionKeyword);
    List<Question> findAllByOrderByTimestampDesc();
}
