package com.gdsd.TutorService.dto.Admin;

public class BannedUserDTO {
    private Integer id;
    private String name;
    private String status;
    private String role;

    // Constructors, getters, and setters
    public BannedUserDTO(Integer id, String name, String status, String role) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.role = role;
    }

    // Getters and Setters
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
