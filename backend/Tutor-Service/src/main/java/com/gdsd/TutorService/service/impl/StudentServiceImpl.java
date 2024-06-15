package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.model.StudentContent;
import com.gdsd.TutorService.repository.StudentContentRepository;
import com.gdsd.TutorService.repository.StudentRepository;
import com.gdsd.TutorService.service.interf.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentContentRepository studentContentRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Integer getStudentIdFromEmail(String studentEmail) {
        Student student = studentRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new GenericException("Student with studentEmail: "
                        + studentEmail + " not found", HttpStatus.NOT_FOUND));

        return student.getStudentId();
    }

    @Override
    public String getStudentNameFromId(Integer studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new GenericException("Student with id: " + studentId
                                + " not found", HttpStatus.NOT_FOUND));
        return student.getFirstName() + " " + student.getLastName();
    }

    public String getStudentProfileImageFromId(Integer studentId) {
        Optional<StudentContent> content = studentContentRepository.findByStudentIdAndContentType(studentId, "profile_image");

        if(content.isPresent()) {
            return content.get().getContentLink();
        } else {
            return "";
        }
    }


}
