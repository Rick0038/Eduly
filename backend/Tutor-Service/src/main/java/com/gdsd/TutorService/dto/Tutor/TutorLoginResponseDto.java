package com.gdsd.TutorService.dto.Tutor;

public class TutorLoginResponseDto {
    private String jwt;
    private Boolean authorized;

    public TutorLoginResponseDto() {
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Boolean getAuthorized() {
        return authorized;
    }

    public void setAuthorized(Boolean authorized) {
        this.authorized = authorized;
    }
}
