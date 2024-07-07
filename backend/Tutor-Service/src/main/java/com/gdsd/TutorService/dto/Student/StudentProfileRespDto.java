package com.gdsd.TutorService.dto.Student;

public class StudentProfileRespDto {
    private String profileImgLink;
    private String status;


    public StudentProfileRespDto() {}


    public StudentProfileRespDto(String profileImgLink, String status) {
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
