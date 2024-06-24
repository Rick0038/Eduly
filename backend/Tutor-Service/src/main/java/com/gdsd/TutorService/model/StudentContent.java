package com.gdsd.TutorService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_profile_content")
public class StudentContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contentId")
    private Integer contentId;

    @Column(name = "studentId", nullable = false)
    private Integer studentId;

    @Column(name = "contentLink")
    private String contentLink;

    @Column(name = "status")
    private String status;

    @Column(name = "contentType")
    private String contentType;

    public StudentContent() {
    }

    public Integer getContentId() {
        return contentId;
    }

    public void setContentId(Integer contentId) {
        this.contentId = contentId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
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

    @Override
    public String toString() {
        return "StudentContent{" +
                "contentId=" + contentId +
                ", studentId=" + studentId +
                ", contentLink='" + contentLink + '\'' +
                ", status='" + status + '\'' +
                ", contentType='" + contentType + '\'' +
                '}';
    }
}
