package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestionIdOrderByTimestampDesc(Integer questionId);
}
