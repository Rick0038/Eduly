package com.gdsd.TutorService.dto.Tutor;

import java.util.List;

public class TutorProfileUpdateRequestDto {
    private String firstName;
    private String lastName;
    private List<String> topics;
    private String language;
    private String bbbLink;
    private String intro;
    private Double pricing;

    private String email;

    public TutorProfileUpdateRequestDto() {
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

    public List<String> getTopics() {
        return topics;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getBbbLink() {
        return bbbLink;
    }

    public void setBbbLink(String bbbLink) {
        this.bbbLink = bbbLink;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public Double getPricing() {
        return pricing;
    }

    public void setPricing(Double pricing) {
        this.pricing = pricing;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
