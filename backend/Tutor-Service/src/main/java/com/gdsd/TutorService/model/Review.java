package com.gdsd.TutorService.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tutor_review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewId")
    private Integer reviewId;

    @Column(name = "rating")
    private Double rating;  // Should not be static

    @Column(name = "text")
    private String text;

    @Column(name = "tutorId")
    private Integer tutorId;

    @Column(name = "studentId")
    private Integer studentId;

    public Review() {
    }

    public Integer getReviewId() {
        return reviewId;
    }

    public void setReviewId(Integer reviewId) {
        this.reviewId = reviewId;
    }

    public Double getRating() {
        return rating;  // This should be non-static
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

    public Integer getTutorId() {
        return tutorId;
    }

    public void setTutorId(Integer tutorId) {
        this.tutorId = tutorId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    @Override
    public String toString() {
        return "Review{" +
                "reviewId=" + reviewId +
                ", rating=" + rating +
                ", text='" + text + '\'' +
                ", tutorId=" + tutorId +
                ", studentId=" + studentId +
                '}';
    }
}
