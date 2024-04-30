package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.repository.StudentRepository;
import com.gdsd.TutorService.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public String createStudent(Student student) {
        Student createdStudent = studentRepository.save(student);
        return "New student with id: " + student.getId() + " and email: " + student.getEmail() + " created successfully";
    }

    @Override
    public Student getStudentById(Long studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent()) {
            return student.get();
        } else {
            //Todo create a global exception handler
            throw new RuntimeException("Student with given id " + studentId + " doesn't exist.");
        }
    }

    @Override
    public Student getStudentByEmail(String email) {
        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isPresent()) {
            return student.get();
        } else {
            //Todo create a global exception handler
            throw new RuntimeException("Student with given email " + email + " doesn't exist.");
        }
    }
}
