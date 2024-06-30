package com.gdsd.TutorService.model;

import jakarta.persistence.*;


@Entity
@Table(name = "tutor_user_det")
public class Tutor {

    @Id
    @Column(name = "tutorId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer tutorId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;
    private String language;
    private String email;
    private String password;
    private Double rating;

    @Column(name = "isBanned")
    private Boolean isBanned;

    @Column(name = "isLocked")
    private Boolean isLocked;

    private String status;

    private String intro;

    private Double price;

    @Column(name = "numLessonsTaught")
    private Integer numLessonsTaught;

    @Column(name = "numberOfRatings")
    private Integer numberOfRatings;

    @Column(name = "bbbLink")
    private String bbbLink;

//Todo- cascading in db tables. if tutor deleted then associated topics, quali should also be deleted

    public Tutor() {
    }

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
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

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
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

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Boolean getBanned() {
        return isBanned;
    }

    public void setBanned(Boolean banned) {
        isBanned = banned;
    }

    public Boolean getLocked() {
        return isLocked;
    }

    public void setLocked(Boolean locked) {
        isLocked = locked;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Integer getNumLessonsTaught() {
        return numLessonsTaught;
    }

    public void setNumLessonsTaught(Integer numLessonsTaught) {
        this.numLessonsTaught = numLessonsTaught;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getNumberOfRatings() {
        return numberOfRatings;
    }

    public void setNumberOfRatings(Integer numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }

    public String getBbbLink() {
        return bbbLink;
    }

    public void setBbbLink(String bbbLink) {
        this.bbbLink = bbbLink;
    }

    @Override
    public String toString() {
        return "Tutor{" +
                "tutorId=" + tutorId +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    public void setAverageRating(double averageRating) {
        this.rating = averageRating;
        //LOL
    }
}
