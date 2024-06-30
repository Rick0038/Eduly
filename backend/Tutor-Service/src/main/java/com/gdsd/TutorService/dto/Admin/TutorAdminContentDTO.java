package com.gdsd.TutorService.dto.Admin;

import java.time.LocalDateTime;

public class TutorAdminContentDTO {
    private Integer id;
    private Integer tutorId;
    private String link;
    private String status;
    private String tutorName;
    private String contentType;
   private LocalDateTime uploadTimestamp;

    public TutorAdminContentDTO() {}

    public TutorAdminContentDTO(Integer id, Integer tutorId, String link, String status, String tutorName,String contentType, LocalDateTime uploadTimestamp) {
        this.id = id;
        this.tutorId = tutorId;
        this.link = link;
        this.status = status;
        this.contentType = contentType;
        this.tutorName=tutorName;
        this.uploadTimestamp = uploadTimestamp;
    }



    // Getters and Setters
    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
    }

    public String getlink() {
        return link;
    }

    public void setlink(String link) {
        this.link = link;
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

    public LocalDateTime getUploadTimestamp() {
        return uploadTimestamp;
    }

    public void setUploadTimestamp(LocalDateTime uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }
}
