package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.model.StudentContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentContentRepository extends JpaRepository<StudentContent, Integer> {
    Optional<StudentContent> findByStudentIdAndContentType(Integer studentId, String contentType);
    List<StudentContent> findByStatus(String status);
    List<StudentContent> findByStatusOrderByUploadTimestampAsc(String status);
    Optional<StudentContent> findByContentId(Integer contenId);

    @Query("DELETE FROM StudentContent sc WHERE sc.studentId = :studentId")
    void deleteByStudentId(@Param("studentId") Integer studentId);

}
