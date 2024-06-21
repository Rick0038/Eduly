package com.gdsd.TutorService.dto.Tutor;

public class TutorIntroVideoRespDto {
    private String videoLink;
    private String status;


    public TutorIntroVideoRespDto() {
    }

    public TutorIntroVideoRespDto(String videoLink, String status) {
        this.videoLink = videoLink;
        this.status = status;
    }

    // Getters and Setters
    public String getVideoLink() {
        return videoLink;
    }

    public void setVideoLink(String videoLink) {
        this.videoLink = videoLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
