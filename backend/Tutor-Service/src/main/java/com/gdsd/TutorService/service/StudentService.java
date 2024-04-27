package com.gdsd.TutorService.service;

import com.gdsd.TutorService.model.Student;

public interface StudentService {
    public String createStudent(Student student);
    public Student getStudentById(Long studentId);
    public Student getStudentByEmail(String email);
}
