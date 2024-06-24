package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByEmail(String email);
    Boolean existsByEmail(String email);
}
