package com.gdsd.TutorService.dto.Tutor;

public class TutorSearchResponseDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private Double pricing;
    private Double rating;
    private Integer numberOfRatings;
    private String topic;
    private String language;
    private Integer numLessonsTaught;
    private String intro;
    private String profileImgLink;

    public TutorSearchResponseDto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Double getPricing() {
        return pricing;
    }

    public void setPricing(Double pricing) {
        this.pricing = pricing;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getNumberOfRatings() {
        return numberOfRatings;
    }

    public void setNumberOfRatings(Integer numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getNumLessonsTaught() {
        return numLessonsTaught;
    }

    public void setNumLessonsTaught(Integer numLessonsTaught) {
        this.numLessonsTaught = numLessonsTaught;
    }

    public String getIntro() {
        return intro;
    }

    public void setIntro(String intro) {
        this.intro = intro;
    }

    public String getProfileImgLink() {
        return profileImgLink;
    }

    public void setProfileImgLink(String profileImgLink) {
        this.profileImgLink = profileImgLink;
    }
}
