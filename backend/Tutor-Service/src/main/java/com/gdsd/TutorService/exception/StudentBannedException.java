package com.gdsd.TutorService.exception;

public class StudentBannedException extends RuntimeException {
    public StudentBannedException(Integer studentId) {
        super("User ID " + studentId + " is banned.");
    }
}
