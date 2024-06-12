package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TutorSearchRepository {
    List<TutorSearchResponseDto> searchTutors(Double pricingMin, Double pricingMax, Double ratingsMin,
                                              String topic, String language, Integer experienceMin);
}
