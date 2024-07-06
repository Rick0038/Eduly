package com.gdsd.TutorService.dto.Student;

import org.springframework.web.multipart.MultipartFile;

public class StudentProfileImageRequestDto {
    private MultipartFile file;

    // Getters and setters
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
