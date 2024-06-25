package com.gdsd.TutorService.dto.Admin;

import java.time.LocalDateTime;

public class TutorAdminContentDTO {
    private Integer contentId;
    private Integer tutorId;
    private String contentLink;
    private String status;
    private String tutorName;
    private String contentType;
//    private LocalDateTime uploadTimestamp;

    public TutorAdminContentDTO() {}

//    public TutorAdminContentDTO(Integer contentId, Integer tutorId, String contentLink, String status, String contentType, LocalDateTime uploadTimestamp) {
//        this.contentId = contentId;
//        this.tutorId = tutorId;
//        this.contentLink = contentLink;
//        this.status = status;
//        this.contentType = contentType;
//        this.uploadTimestamp = uploadTimestamp;
//    }

    public TutorAdminContentDTO(Integer contentId, Integer tutorId, String contentLink, String status,String tutorName, String contentType) {
        this.contentId = contentId;
        this.tutorId = tutorId;
        this.contentLink = contentLink;
        this.status = status;
        this.tutorName=tutorName;
        this.contentType = contentType;
    }

    // Getters and Setters
    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(Integer contentId) {
        this.contentId = contentId;
    }

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
    }

    public String getContentLink() {
        return contentLink;
    }

    public void setContentLink(String contentLink) {
        this.contentLink = contentLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getTutorName() {
        return tutorName;
    }

    public void setTutorName(String tutorName) {
        this.tutorName = tutorName;
    }

//    public LocalDateTime getUploadTimestamp() {
//        return uploadTimestamp;
//    }
//
//    public void setUploadTimestamp(LocalDateTime uploadTimestamp) {
//        this.uploadTimestamp = uploadTimestamp;
//    }
}
