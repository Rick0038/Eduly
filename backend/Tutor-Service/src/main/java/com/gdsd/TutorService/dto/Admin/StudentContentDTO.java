package com.gdsd.TutorService.dto.Admin;

import java.time.LocalDateTime;

public class StudentContentDTO {

    private Integer id;
    private Integer studentId;
    private String type;
    private String link;

    private  String studentName;
    private String status;
    private LocalDateTime uploadTimestamp;

    public StudentContentDTO() {
    }

    public StudentContentDTO(Integer id, Integer studentId, String type, String link,String studentName, String status, LocalDateTime uploadTimestamp) {
        this.id = id;
        this.studentId = studentId;
        this.type = type;
        this.link = link;
        this.status = status;
        this.studentName=studentName;
        this.uploadTimestamp = uploadTimestamp;
    }

    public Integer getid() {
        return id;
    }

    public void setid(Integer id) {
        this.id = id;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public LocalDateTime getUploadTimestamp() {
        return uploadTimestamp;
    }

    public void setUploadTimestamp(LocalDateTime uploadTimestamp) {
        this.uploadTimestamp = uploadTimestamp;
    }
}
