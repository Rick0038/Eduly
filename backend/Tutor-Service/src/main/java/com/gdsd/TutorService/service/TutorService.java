package com.gdsd.TutorService.service;

import com.gdsd.TutorService.dto.TutorRequestDto;
import com.gdsd.TutorService.dto.TutorResponseDto;
import com.gdsd.TutorService.dto.TutorSearchResponseDto;
import com.gdsd.TutorService.model.Tutor;

import java.util.List;

public interface TutorService {
    public String createTutor(TutorRequestDto tutorRequestDto);
    public TutorResponseDto getTutorById(Integer tutorId);
    public String deleteTutorById(Integer tutorId);

    public List<TutorSearchResponseDto> search(Double pricingMin,
                                               Double pricingMax, Double ratingsMin,
                                               String topic, String language,
                                               Integer experienceMin);
}
