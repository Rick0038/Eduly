package com.gdsd.StudentService.repository;

import com.gdsd.StudentService.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// THIS THING LINK THE DB WITH JAVA 3
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
