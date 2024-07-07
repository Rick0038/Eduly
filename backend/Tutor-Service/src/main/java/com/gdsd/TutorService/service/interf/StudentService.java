package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Student.*;
import com.gdsd.TutorService.model.Session;
import com.gdsd.TutorService.model.Student;

public interface StudentService {
    Integer getStudentIdFromEmail(String studentEmail);
    String getStudentNameFromId(Integer studentId);
    String getStudentProfileImageFromId(Integer studentId);
    StudentResponceDto getStudentById(Integer studentId);

    void deleteStudentByEmail(String email);
    Student getStudentByEmail(String email);

    StudentProfileRespDto updateStudentProfileImage(StudentProfileImageRequestDto profileImageRequestDto, Integer studentId);
    Boolean updateStudentProfile(Integer studentId, StudentProfileUpdateRequestDto studentProfileUpdateRequest);
    Session bookSession(Integer sessionId, Integer studentId);
    SessionCancellationResponseDto cancelSession(Integer sessionId, Integer studentId);
}
