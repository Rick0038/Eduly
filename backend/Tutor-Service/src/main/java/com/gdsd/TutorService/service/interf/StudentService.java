package com.gdsd.TutorService.service.interf;

public interface StudentService {
    Integer getStudentIdFromEmail(String studentEmail);
    String getStudentNameFromId(Integer studentId);
    String getStudentProfileImageFromId(Integer studentId);
}
