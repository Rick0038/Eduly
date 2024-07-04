package com.gdsd.TutorService.dto.Student;

public class StudentProfileDto {

    private Integer id;
    private String status;
    private String firstName;
    private String lastName;
    private String email;
    private ProfileImgLink profileImgLink;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ProfileImgLink getProfileImgLink() {
        return profileImgLink;
    }

    public void setProfileImgLink(ProfileImgLink profileImgLink) {
        this.profileImgLink = profileImgLink;
    }

    public static class ProfileImgLink {
        private String link;
        private String status;

        public ProfileImgLink() {
        }

        public ProfileImgLink(String link, String status) {
            this.link = link;
            this.status = status;
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
    }
}