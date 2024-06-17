package com.gdsd.TutorService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tutor_content_det")
public class TutorContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contentId")
    private Integer contentId;

    @Column(name = "tutorId")
    private Integer tutorId;

    @Column(name = "contentFileName")
    private String contentFileName;
    @Column(name = "contentLink")
    private String contentLink;

    @Column(name = "status")
    private String status;

    @Column(name = "contentType")
    private String contentType;

    public TutorContent() {
    }



    public enum Status {
        APPROVED,
        PENDING_FOR_APPROVAL,
        REJECTED
    }

    public enum ContentType {
        profile_image,
        intro_video,
        cv
    }
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

    public String getContentFileName() {
        return contentFileName;
    }

    public void setContentFileName(String contentFileName) {
        this.contentFileName = contentFileName;
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
        return "TutorContent{" +
                "contentId=" + contentId +
                ", tutorId=" + tutorId +
                ", contentLink='" + contentLink + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
