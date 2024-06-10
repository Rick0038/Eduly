package com.gdsd.StudentService.dto;

// THIS SITS BETWEEN THE JAVA IMPLEMENTATION AND THE DATABASE 4

public class StudentRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String profilePicture;
    private String isBanned;
    private String isLocked;

    // constructor for the DTO
    public StudentRequestDto(){

    }

    // getter and setters
    // impliments directly in database step 1
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getIsBanned() {
        return isBanned;
    }

    public void setIsBanned(String isBanned) {
        this.isBanned = isBanned;
    }

    public String getIsLocked() {
        return isLocked;
    }

    public void setIsLocked(String isLocked) {
        this.isLocked = isLocked;
    }
}
