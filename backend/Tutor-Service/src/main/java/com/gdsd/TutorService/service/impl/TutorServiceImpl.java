package com.gdsd.TutorService.service.impl;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.models.BlobHttpHeaders;
import com.gdsd.TutorService.dto.Tutor.*;
import com.gdsd.TutorService.config.AzureBlob.AzureBlobStorageConfig;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.exception.ResourceNotFoundException;
import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.model.TutorContent;
import com.gdsd.TutorService.repository.TutorContentRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.TutorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TutorServiceImpl implements TutorService {

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private TutorContentRepository tutorContentRepository;
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

        if (content.isPresent()) {
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

    @Override
    public TutorProfileResponseDto updateTutorCV(TutorProfileRequestDto requestDto, Integer tutorId) {
        Optional<TutorContent> existContent = tutorContentRepository.findByTutorIdAndContentType(tutorId, String.valueOf(TutorContent.ContentType.cv));
            if (existContent.isPresent()) {
                TutorContent existingContent = existContent.get();
                // Delete the existing CV blob
                deleteBlob(existingContent.getContentLink());
                tutorContentRepository.delete(existingContent);
            }
        // Generate a unique filename for the CV file
        String fileName = "cv_" + tutorId + "_" + UUID.randomUUID().toString();

        try {
            // Upload new CV blob

            BlobClient blobClient = azureBlobStorageConfig.blobContainerClient().getBlobClient(fileName);
            BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(requestDto.getFile().getContentType());
            blobClient.upload(requestDto.getFile().getInputStream(), requestDto.getFile().getSize(), true);
            blobClient.setHttpHeaders(headers);

            URI blobUri = URI.create(blobClient.getBlobUrl());
            String cvLink = blobUri.toString();

  //          Optional<TutorContent> existContent = tutorContentRepository.findByTutorIdAndContentType(tutorId, String.valueOf(TutorContent.ContentType.cv));
//            if (existContent.isPresent()) {
//                TutorContent existingContent = existContent.get();
//                // Delete the existing CV blob
//                deleteBlob(existingContent.getContentLink());
//                // Delete the existing content record
//                existingContent.setContentFileName(requestDto.getFile().getOriginalFilename());
//                existingContent.setContentLink(cvLink);
//                tutorContentRepository.save(existingContent);
//
//            }else {
                // Save new content record in database
                TutorContent newContent = new TutorContent();
                newContent.setTutorId(tutorId);
                newContent.setContentFileName(requestDto.getFile().getOriginalFilename());
                newContent.setContentLink(cvLink);
                newContent.setStatus(String.valueOf(TutorContent.Status.PENDING_FOR_APPROVAL));
                newContent.setContentType(String.valueOf(TutorContent.ContentType.cv));
                tutorContentRepository.save(newContent);



            TutorProfileResponseDto responseDto = new TutorProfileResponseDto();
            responseDto.setLink(cvLink);
            return responseDto;

        } catch (IOException e) {
//            // Handle exception appropriately ask aashay
//            e.printStackTrace();
            throw new RuntimeException("Failed to upload CV: " + e.getMessage());
        }
    }
    public TutorProfileResponseDto updateTutorProfileImage(TutorProfileRequestDto requestDto, Integer tutorId) {
        String fileName = "profile_" + tutorId + "_" + UUID.randomUUID().toString();
        Optional<TutorContent> existingContentOptional = tutorContentRepository.findByTutorIdAndContentType(tutorId, TutorContent.ContentType.profile_image.name());
        if (existingContentOptional.isPresent()) {
            TutorContent existingContent = existingContentOptional.get();
            // Delete the existing profile image blob
            deleteBlob(existingContent.getContentLink());
            tutorContentRepository.delete(existingContent);
        }
        try {

            // Upload new profile image blob

            BlobClient blobClient = azureBlobStorageConfig.blobContainerClient().getBlobClient(fileName);
            BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(requestDto.getFile().getContentType());
            blobClient.upload(requestDto.getFile().getInputStream(), requestDto.getFile().getSize(), true);
            blobClient.setHttpHeaders(headers);


            URI blobUri = URI.create(blobClient.getBlobUrl());
            String profileImgLink = blobUri.toString();

            // Check if there's already an existing profile image content for the tutor
//            Optional<TutorContent> existingContentOptional = tutorContentRepository.findByTutorIdAndContentType(tutorId, TutorContent.ContentType.profile_image.name());
//            if (existingContentOptional.isPresent()) {
//                TutorContent existingContent = existingContentOptional.get();
//                // Delete the existing profile image blob
//                deleteBlob(existingContent.getContentLink());
//                // Update the existing content record
//                existingContent.setContentFileName(requestDto.getFile().getOriginalFilename());
//                existingContent.setContentLink(profileImgLink);
//                tutorContentRepository.save(existingContent);
//            } else {
                // Save new content record in database
                TutorContent newContent = new TutorContent();
                newContent.setTutorId(tutorId);
                newContent.setContentFileName(requestDto.getFile().getOriginalFilename());
                newContent.setContentLink(profileImgLink);
                newContent.setStatus(String.valueOf(TutorContent.Status.PENDING_FOR_APPROVAL));
                newContent.setContentType(String.valueOf(TutorContent.ContentType.profile_image));
                tutorContentRepository.save(newContent);
           // }
           TutorProfileResponseDto responseDto = new TutorProfileResponseDto();
            responseDto.setLink(profileImgLink);
            return responseDto;
        } catch (IOException e) {
            // Handle exception appropriately
            e.printStackTrace();
            throw new RuntimeException("Failed to upload profile image: " + e.getMessage());
        }
    }
    private void deleteBlob(String blobLink) {
        if (!StringUtils.isEmpty(blobLink)) {
            try {
                int lastSlashIndex = blobLink.lastIndexOf('/');
                String blobName =blobLink.substring(lastSlashIndex + 1);
                BlobClient blobClient = azureBlobStorageConfig.blobContainerClient().getBlobClient(String.valueOf(blobName));
                if (blobClient.exists()) {
                    blobClient.delete();
                }
            } catch (Exception e) {
                // handle exception ashay
                e.printStackTrace();
            }
        }
    }
}
