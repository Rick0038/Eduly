package com.gdsd.TutorService.dto.Tutor;

public class TutorProfileImageRespDto {

    private String profileImgLink;
    private String status;


    public TutorProfileImageRespDto() {}


    public TutorProfileImageRespDto(String profileImgLink, String status) {
        this.profileImgLink = profileImgLink;
        this.status = status;
    }


    public String getProfileImgLink() {
        return profileImgLink;
    }

    public void setProfileImgLink(String profileImgLink) {
        this.profileImgLink = profileImgLink;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
