package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.model.TutorContent;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorContentRepository extends JpaRepository<TutorContent, Integer> {
    Optional<TutorContent> findByTutorIdAndContentType(Integer tutorId, String contentType);
    List<TutorContent> findByStatus(String status);

    List<TutorContent> findByStatusOrderByUploadTimestampAsc(String status);
    Optional<TutorContent> findByContentId(Integer contentId);
    @Transactional
    @Modifying
    @Query("DELETE FROM TutorContent tc WHERE tc.tutorId = :tutorId")
    void deleteByTutorId(@Param("tutorId") Integer tutorId);

}
