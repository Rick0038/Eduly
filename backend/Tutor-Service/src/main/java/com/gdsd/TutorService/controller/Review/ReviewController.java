package com.gdsd.TutorService.controller.Review;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.model.Review;
import com.gdsd.TutorService.service.impl.ReviewServiceImpl;
import com.gdsd.TutorService.service.impl.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/student")
public class ReviewController {

    @Autowired
    private ReviewServiceImpl reviewService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private StudentServiceImpl studentService;

    // Method for writing a review
    @PostMapping("/write-review/tutor/{tutorId}")
    public ResponseEntity<Void> writeReview(@PathVariable Integer tutorId,
                                            @RequestBody Review review,
                                            @RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer studentId = studentService.getStudentIdFromEmail(email);

        review.setStudentId(studentId);
        review.setTutorId(tutorId);
        reviewService.createReview(review);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // Method for editing a review
    @PutMapping("/edit-review/{reviewId}")
    public ResponseEntity<Review> editReview(@PathVariable Integer reviewId,
                                             @RequestBody Review reviewDetails,
                                             @RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer studentId = studentService.getStudentIdFromEmail(email);

        Optional<Review> existingReview = reviewService.getReviewById(reviewId);
        if (existingReview.isPresent() && existingReview.get().getStudentId().equals(studentId)) {
            reviewDetails.setStudentId(studentId); // Ensure the review remains associated with the same student
            reviewDetails.setTutorId(existingReview.get().getTutorId()); // Preserve the tutor ID
            Review updatedReview = reviewService.updateReview(reviewId, reviewDetails);
            return new ResponseEntity<>(updatedReview, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    // Method for deleting a review
    @DeleteMapping("/delete-review/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer reviewId,
                                             @RequestHeader("Authorization") String authorizationHeader) {
        String token = tokenProvider.getTokenFromAuthorizationHeader(authorizationHeader);
        String email = tokenProvider.getEmailFromToken(token);
        Integer studentId = studentService.getStudentIdFromEmail(email);

        Optional<Review> existingReview = reviewService.getReviewById(reviewId);
        if (existingReview.isPresent() && existingReview.get().getStudentId().equals(studentId)) {
            reviewService.deleteReview(reviewId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
