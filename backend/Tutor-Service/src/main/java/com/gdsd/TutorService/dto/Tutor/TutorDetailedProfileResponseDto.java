package com.gdsd.TutorService.dto.Tutor;

import java.util.List;
import java.util.Set;

public class TutorDetailedProfileResponseDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String status;
    private Double pricing;
    private Double rating;
    private Integer numberOfRatings;
    private Set<String> topic;
    private String language;
    private String introText;
    private Integer numLessonsTaught;
    private Content profileImgLink;
    private Content cv;
    private Content video;
    private String bbbLink;
    private List<Session> schedule;
    private List<Review> reviews;

    public static class Content {
        private String link;
        private String status;

        public Content() {
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

    public static class Session {
        private String date;
        private List<Timing> timings;

        public Session() {
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public List<Timing> getTimings() {
            return timings;
        }

        public void setTimings(List<Timing> timings) {
            this.timings = timings;
        }
    }

    public static class Timing {
        private Integer sessionId;
        private String from;
        private String to;
        private String status;

        public Timing() {
        }

        public Integer getSessionId() {
            return sessionId;
        }

        public void setSessionId(Integer sessionId) {
            this.sessionId = sessionId;
        }

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = from;
        }

        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    public static class Review {
        private Integer id;
        private Double rating;
        private String text;
        private By reviewBy;

        public Review() {
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Double getRating() {
            return rating;
        }

        public void setRating(Double rating) {
            this.rating = rating;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public By getReviewBy() {
            return reviewBy;
        }

        public void setReviewBy(By reviewBy) {
            this.reviewBy = reviewBy;
        }
    }

    public static class By {
        private String name;
        private String profileImgLink;

        public By() {
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getProfileImgLink() {
            return profileImgLink;
        }

        public void setProfileImgLink(String profileImgLink) {
            this.profileImgLink = profileImgLink;
        }
    }


}
