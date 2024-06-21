package com.gdsd.TutorService.service.impl;


import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.gdsd.TutorService.dto.Tutor.*;
import com.gdsd.TutorService.config.AzureBlob.AzureBlobStorageConfig;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.exception.ResourceNotFoundException;

import com.gdsd.TutorService.dto.Tutor.TutorRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorResponseDto;
import com.gdsd.TutorService.dto.Tutor.TutorScheduleRequestDto;
import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.exception.ResourceNotFoundException;
import com.gdsd.TutorService.model.Session;
import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.model.TutorContent;
import com.gdsd.TutorService.repository.SessionRepository;
import com.gdsd.TutorService.repository.TutorContentRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.TutorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.*;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@Service
public class TutorServiceImpl implements TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private TutorContentRepository tutorContentRepository;

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AzureBlobStorageConfig azureBlobStorageConfig;


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

        if (content.isPresent()) {
            return content.get().getContentLink();
        } else {
            return "";
        }
    }

    @Override
    public void addTutorSchedule(TutorScheduleRequestDto tutorScheduleRequestDto, Integer tutorId) {
        LocalDate date = LocalDate.parse(tutorScheduleRequestDto.getDate());
        LocalTime fromTime = LocalTime.parse(tutorScheduleRequestDto.getFrom());
        LocalTime toTime = LocalTime.parse(tutorScheduleRequestDto.getTo());

        Session session = new Session();
        session.setSessionId(null);
        session.setStudentId(null);
        session.setSessionType(null);
        session.setTutorId(tutorId);
        session.setDate(date);
        session.setStartTime(fromTime);
        session.setEndTime(toTime);
        session.setStatus(String.valueOf(Session.Status.FREE));
        session.setLocation(null);
        session.setLocationMode(null);
        session.setDay(date.format(DateTimeFormatter.ofPattern("EEEE", Locale.ENGLISH)));
        sessionRepository.save(session);
    }

    @Override
    public void updateTutorSchedule(TutorScheduleRequestDto tutorScheduleRequestDto, Integer tutorId, Integer sessionId) {
        Session session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new GenericException("Session with id: "
                        + sessionId + " not found.", HttpStatus.NOT_FOUND));

        if(session.getTutorId() != tutorId) {
            throw new GenericException("Tutor not related to this session", HttpStatus.UNAUTHORIZED);
        }

        LocalDate date = LocalDate.parse(tutorScheduleRequestDto.getDate());
        LocalTime fromTime = LocalTime.parse(tutorScheduleRequestDto.getFrom());
        LocalTime toTime = LocalTime.parse(tutorScheduleRequestDto.getTo());

        session.setDate(date);
        session.setStartTime(fromTime);
        session.setEndTime(toTime);
        session.setDay(date.format(DateTimeFormatter.ofPattern("EEEE", Locale.ENGLISH)));

        sessionRepository.save(session);
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


    public Object updateTutorContent(TutorProfileRequestDto requestDto, Integer tutorId, String contentType) {
        String fileName = generateFileName(contentType, tutorId);

        try {
            // Upload new blob
            BlobClient blobClient = azureBlobStorageConfig.blobContainerClient().getBlobClient(fileName);
            BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(requestDto.getFile().getContentType());
            blobClient.upload(requestDto.getFile().getInputStream(), requestDto.getFile().getSize(), true);
            blobClient.setHttpHeaders(headers);

            URI blobUri = URI.create(blobClient.getBlobUrl());
            String contentLink = blobUri.toString();

            // Update TutorContent in database
            updateTutorContent(tutorId, contentLink, contentType);

            // Prepare appropriate response DTO based on contentType
            Object responseDto = null;
            switch (contentType) {
                case "cv":
                    TutorCVRespDTO cvResponseDto = new TutorCVRespDTO();
                    cvResponseDto.setCvLink(contentLink);
                    cvResponseDto.setStatus("PENDING_APPROVAL");
                    responseDto = cvResponseDto;
                    break;
                case "profile_image":
                    TutorProfileImageRespDto profileImageResponseDto = new TutorProfileImageRespDto();
                    profileImageResponseDto.setProfileImgLink(contentLink);
                    profileImageResponseDto.setStatus("PENDING_APPROVAL");
                    responseDto = profileImageResponseDto;
                    break;
                case "intro_video":
                    TutorIntroVideoRespDto introVideoResponseDto = new TutorIntroVideoRespDto();
                    introVideoResponseDto.setVideoLink(contentLink);
                    introVideoResponseDto.setStatus("PENDING_APPROVAL");
                    responseDto = introVideoResponseDto;
                    break;
                default:
                    // Handle unsupported content type if necessary
                    throw new GenericException("Unsupported contentType: " +contentType,HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return responseDto;

        } catch (IOException e) {
            throw new GenericException("Failed to upload content: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private String generateFileName(String contentType, Integer tutorId) {
        return contentType + "_" + tutorId ;
    }
    public void updateTutorContent(Integer tutorId, String contentLink, String contentType) {
        Optional<TutorContent> existingContentOptional = tutorContentRepository.findByTutorIdAndContentType(tutorId, contentType);

        if (existingContentOptional.isPresent()) {
            TutorContent existingContent = existingContentOptional.get();
            tutorContentRepository.delete(existingContent);
        }

        TutorContent newContent = new TutorContent();
        newContent.setTutorId(tutorId);
        newContent.setContentLink(contentLink);
        newContent.setStatus("PENDING_APPROVAL");
        newContent.setContentType(contentType);
        tutorContentRepository.save(newContent);
    }

    private void deleteBlob(String blobLink) {
        if (!StringUtils.isEmpty(blobLink)) {
                int lastSlashIndex = blobLink.lastIndexOf('/');
                String blobName =blobLink.substring(lastSlashIndex + 1);
                BlobClient blobClient = azureBlobStorageConfig.blobContainerClient().getBlobClient(String.valueOf(blobName));
                if (blobClient.exists()) {
                    blobClient.delete();
                }
        }
    }
}
