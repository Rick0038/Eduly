package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.model.Review;
import com.gdsd.TutorService.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Optional<Review> getReviewById(Integer reviewId) {
        return reviewRepository.findById(reviewId);
    }

    public Optional<List<Review>> getReviewsByTutorId(Integer tutorId) {
        return reviewRepository.findByTutorId(tutorId);
    }

    public Optional<List<Review>> getReviewsByStudentId(Integer studentId) {
        return reviewRepository.findByStudentId(studentId);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review updateReview(Integer reviewId, Review reviewDetails) {
        Optional<Review> reviewOptional = reviewRepository.findById(reviewId);
        if (reviewOptional.isPresent()) {
            Review review = reviewOptional.get();
            review.setRating(reviewDetails.getRating());
            review.setText(reviewDetails.getText());
            review.setTutorId(reviewDetails.getTutorId());
            review.setStudentId(reviewDetails.getStudentId());
            return reviewRepository.save(review);
        } else {
            throw new RuntimeException("Review not found with id " + reviewId);
        }
    }

    public void deleteReview(Integer reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
