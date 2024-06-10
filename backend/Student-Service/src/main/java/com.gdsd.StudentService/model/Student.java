package com.gdsd.StudentService.model;

import jakarta.persistence.*;


// THIS IS BASICALLY A REPRESENTATION OF THE DATABASE IN JAVA. 5
@Entity
@Table(name = "student_user_det")
public class Student {

    @Id
    @Column(name = "studentId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    
    @Column(name = "firstName")
    private String firstName;
    
    @Column(name = "lastName")
    private String lastName;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "password")
    private String password;
    
    @Column(name = "profilePicture")
    private String profilePicture;
    
    @Column(name = "isBanned")
    private Boolean isBanned;
    
    @Column(name = "isLocked")
    private boolean isLocked;

    public Student() {

    }

    // getter and setters

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
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

    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }

    public boolean isLocked() {
        return isLocked;
    }

    public void setLocked(boolean locked) {
        isLocked = locked;
    }

    // for concatenation of multiple tutors

    @Override
    public String toString() {
        String concat = "Student" +
                        "{" +
                            "studentID='"+studentId+"'," +
                            "firstName='"+firstName+"'," +
                            "lastName='"+lastName+"',"+
                            "email='"+email;
        return concat;
    }
}
