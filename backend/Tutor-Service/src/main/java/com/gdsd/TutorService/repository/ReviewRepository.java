package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
}
