package com.gdsd.StudentService.service.impl;

import com.gdsd.StudentService.dto.StudentRequestDto;
import com.gdsd.StudentService.model.Student;
import com.gdsd.StudentService.repository.StudentRepository;
import com.gdsd.StudentService.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


// THIS IS THE SERVICE WHICH IMPLEMENTS THE ACTUAL TASK THAT WE CALLED FROM CONTROLLED 2
@Service
public class StudentServiceImpl implements StudentService {

    private final ModelMapper modelMapper = new ModelMapper();

    @Autowired
    private StudentRepository studentRepository;

    // actual implementation
    public String createStudent(StudentRequestDto studentRequestDto) {
        Student student = modelMapper.map(studentRequestDto, Student.class);
        // as incrementing this automatically in model
        student.setStudentId(null);
        studentRepository.save(student);
        return "Account created successfully for student " + student.getStudentId();
    }

}
