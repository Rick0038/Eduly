package com.gdsd.TutorService.dto.Tutor;

public class TutorCVRespDTO {

    private String cvLink;
    private String status;


    public TutorCVRespDTO() {}


    public TutorCVRespDTO(String cvLink, String status) {
        this.cvLink = cvLink;
        this.status = status;
    }

    // Getters and Setters
    public String getCvLink() {
        return cvLink;
    }

    public void setCvLink(String cvLink) {
        this.cvLink = cvLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
