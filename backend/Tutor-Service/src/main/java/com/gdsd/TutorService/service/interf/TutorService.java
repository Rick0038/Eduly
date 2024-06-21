package com.gdsd.TutorService.service.interf;

import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorScheduleRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;

import java.util.List;

public interface TutorService {
    String createTutor(TutorRequestDto tutorRequestDto);
    TutorResponseDto getTutorById(Integer tutorId);
    String deleteTutorById(Integer tutorId);
    Integer getTutorIdFromEmail(String tutorEmail);
    String getTutorNameFromId(Integer tutorId);
    String getTutorProfileImageFromId(Integer tutorId);
    void addTutorSchedule(TutorScheduleRequestDto tutorScheduleRequestDto, Integer tutorId);
    void updateTutorSchedule(TutorScheduleRequestDto tutorScheduleRequestDto, Integer tutorId, Integer sessionId);

    List<TutorSearchResponseDto> search(Double pricingMin,
                                               Double pricingMax, Double ratingsMin,
                                               String topic, String language,
                                               Integer experienceMin);
}
