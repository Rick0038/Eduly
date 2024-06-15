package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;

import java.util.List;

public interface TutorService {
    public String createTutor(TutorRequestDto tutorRequestDto);
    public TutorResponseDto getTutorById(Integer tutorId);
    public String deleteTutorById(Integer tutorId);
    public Integer getTutorIdFromEmail(String tutorEmail);
    String getTutorNameFromId(Integer tutorId);
    String getTutorProfileImageFromId(Integer tutorId);

    public List<TutorSearchResponseDto> search(Double pricingMin,
                                               Double pricingMax, Double ratingsMin,
                                               String topic, String language,
                                               Integer experienceMin);
}
