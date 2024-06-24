package com.gdsd.TutorService.dto.Auth;

public class LoginResponseDto {
    private Integer id;
    private String name;
    private String token;
    private String role;
    private String profileImgLink;

    public LoginResponseDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getProfileImgLink() {
        return profileImgLink;
    }

    public void setProfileImgLink(String profileImgLink) {
        this.profileImgLink = profileImgLink;
    }
}
