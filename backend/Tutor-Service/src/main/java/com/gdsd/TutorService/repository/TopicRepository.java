package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {
    boolean existsByTutorIdAndTopicName(Integer tutorId, String topicName);
    @Query("SELECT DISTINCT t.topicName FROM Topic t")
    List<String> findDistinctTopicNames();
}
