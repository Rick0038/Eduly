package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByEmail(String email);
    Boolean existsByEmail(String email);

    List<Student> findByIsBannedTrue();

    @Transactional
    @Modifying
    @Query("UPDATE Student s SET s.isBanned = :isBanned WHERE s.studentId = :studentId")
    void updateIsBannedByStudentId(@Param("studentId") Integer studentId, @Param("isBanned") Boolean isBanned);

}
