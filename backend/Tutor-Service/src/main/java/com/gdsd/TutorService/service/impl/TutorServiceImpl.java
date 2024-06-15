package com.gdsd.TutorService.service.impl;

import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.exception.ResourceNotFoundException;
import com.gdsd.TutorService.model.StudentContent;
import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.model.TutorContent;
import com.gdsd.TutorService.repository.TutorContentRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.TutorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TutorServiceImpl implements TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private TutorContentRepository tutorContentRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public String createTutor(TutorRequestDto tutorRequestDto) {
        Tutor tutor = modelMapper.map(tutorRequestDto, Tutor.class);
        tutor.setTutorId(null);
        tutor.setRating(0.0);
        tutor.setNumLessonsTaught(0);
        tutor.setPrice(0.0);
        tutor.setNumberOfRatings(0);
        tutor.setStatus("PENDING_APPROVAL");
        tutorRepository.save(tutor);
        //Todo if Tutor with given email already exists

        return "New Tutor with id: " + tutor.getTutorId() + " and email: "
                + tutor.getEmail() + "successfully created";
    }

    @Override
    public TutorResponseDto getTutorById(Integer tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "tutorId", tutorId));
        TutorResponseDto tutorResponseDto = modelMapper.map(tutor, TutorResponseDto.class);

        return tutorResponseDto;
    }

    @Override
    public String deleteTutorById(Integer tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "tutorId", tutorId));
        tutorRepository.delete(tutor);

        return "Successfully deleted Tutor with id: " + tutor.getTutorId();
    }

    public Integer getTutorIdFromEmail(String tutorEmail) {
        Tutor tutor = tutorRepository.findByEmail(tutorEmail).
                orElseThrow(() -> new GenericException("Tutor with email: "
                        + tutorEmail + " not found", HttpStatus.NOT_FOUND));

        return tutor.getTutorId();

    }

    @Override
    public String getTutorNameFromId(Integer tutorId) {
        Tutor tutor = tutorRepository.findById(tutorId).
                orElseThrow(() -> new ResourceNotFoundException("Tutor", "tutorId", tutorId));

        return tutor.getFirstName() + " " + tutor.getLastName();
    }

    @Override
    public String getTutorProfileImageFromId(Integer tutorId) {
        Optional<TutorContent> content = tutorContentRepository.findByTutorIdAndContentType(tutorId, "profile_image");

        if(content.isPresent()) {
            return content.get().getContentLink();
        } else {
            return "";
        }
    }

    @Override
    public List<TutorSearchResponseDto> search(Double pricingMin,
                                               Double pricingMax, Double ratingsMin,
                                               String topic, String language,
                                               Integer experienceMin) {
        List<TutorSearchResponseDto> tutorSearchResponseDtos = tutorRepository.searchTutors(pricingMin,
                pricingMax, ratingsMin, topic, language);

        return tutorSearchResponseDtos;
    }
}
