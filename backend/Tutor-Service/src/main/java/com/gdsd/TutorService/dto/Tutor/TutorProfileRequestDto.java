package com.gdsd.TutorService.dto.Tutor;

import org.springframework.web.multipart.MultipartFile;

public class TutorProfileRequestDto {

    private MultipartFile file;

    // Getters and setters
    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}