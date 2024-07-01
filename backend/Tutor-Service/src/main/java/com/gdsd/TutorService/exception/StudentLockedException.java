package com.gdsd.TutorService.exception;

public class StudentLockedException extends RuntimeException {
    public StudentLockedException(Integer studentId) {
        super("User ID " + studentId + " is locked.");
    }
}
