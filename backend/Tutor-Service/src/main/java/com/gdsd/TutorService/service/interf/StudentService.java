package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Student.StudentResponceDto;

public interface StudentService {
    Integer getStudentIdFromEmail(String studentEmail);
    String getStudentNameFromId(Integer studentId);
    String getStudentProfileImageFromId(Integer studentId);
    StudentResponceDto getStudentById(Integer studentId);
}
