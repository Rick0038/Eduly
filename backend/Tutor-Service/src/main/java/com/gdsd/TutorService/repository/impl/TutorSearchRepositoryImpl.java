package com.gdsd.TutorService.repository.impl;

import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import com.gdsd.TutorService.repository.TutorSearchRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.*;

public class TutorSearchRepositoryImpl implements TutorSearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TutorSearchResponseDto> searchTutors(Double pricingMin,
                                                     Double pricingMax, Double ratingsMin,
                                                     String topic, String language) {

        StringBuilder queryBuilder = new StringBuilder(
                "SELECT tut.tutorId AS tutorId, " +
                        "tut.firstName AS firstName, " +
                        "tut.lastName AS lastName, " +
                        "tut.price AS pricing, " +
                        "tut.rating AS rating, " +
                        "tut.numberOfRatings AS numberOfRatings, " +
                        "top.topicName AS topic, " +
                        "tut.language AS language, " +
                        "tut.numLessonsTaught AS numLessonsTaught, " +
                        "tut.intro AS intro, " +
                        "content.contentType AS contentType, " +
                        "content.contentLink AS contentLink " +
                        "FROM tutor_user_det tut " +
                        "JOIN tutor_topic_det top ON tut.tutorId = top.tutorId " +
                        "JOIN tutor_profile_content content ON tut.tutorId = content.tutorId " +  // Join with tutor_course_det table
                        "WHERE 1=1 AND content.status = 'APPROVED' AND tut.isBanned=0");


        if (pricingMin != null) {
            queryBuilder.append(" AND tut.price >= :pricingMin");
        }
        if (pricingMax != null) {
            queryBuilder.append(" AND tut.price <= :pricingMax");
        }
        if (ratingsMin != null) {
            queryBuilder.append(" AND tut.rating >= :ratingsMin");
        }
        if (topic != null) {
            queryBuilder.append(" AND LOWER(top.topicName) LIKE LOWER(CONCAT('%', :topic, '%'))");
        }
        if (language != null) {
            queryBuilder.append(" AND tut.language = :language");
        }


        Query query = entityManager.createNativeQuery(queryBuilder.toString());

        if (pricingMin != null) {
            query.setParameter("pricingMin", pricingMin);
        }
        if (pricingMax != null) {
            query.setParameter("pricingMax", pricingMax);
        }
        if (ratingsMin != null) {
            query.setParameter("ratingsMin", ratingsMin);
        }
        if (topic != null) {
            query.setParameter("topic", topic);
        }
        if (language != null) {
            query.setParameter("language", language);
        }


        List<Object[]> results = query.getResultList();
        Map<Integer, TutorSearchResponseDto> tutorMap = new HashMap<>();

        for (Object[] result : results) {
            Integer tutorId = ((Number) result[0]).intValue();
            String contentType = (String) result[10];
            String contentLink = (String) result[11];
            String currentTopic = (String) result[6];

            TutorSearchResponseDto dto = tutorMap.getOrDefault(tutorId, new TutorSearchResponseDto());

            if(tutorMap.get(tutorId) == null) {
                dto.setId(((Number) result[0]).intValue());
                dto.setFirstName((String) result[1]);
                dto.setLastName((String) result[2]);
                dto.setPricing(((Number) result[3]).doubleValue());
                dto.setRating(((Number) result[4]).doubleValue());
                dto.setNumberOfRatings(((Number) result[5]).intValue());

                Set<String> topics = new HashSet<>();
                topics.add(currentTopic);
                dto.setTopic(topics);

                dto.setLanguage((String) result[7]);
                dto.setNumLessonsTaught(((Number) result[8]).intValue());
                dto.setIntro((String) result[9]);
                tutorMap.put(tutorId, dto);
            }

            dto.getTopic().add(currentTopic);
            switch (contentType) {
                case "profile_image":
                    dto.setProfileImgLink(contentLink);
                    break;
                case "cv":
                    dto.setCvLink(contentLink);
                    break;
                case "intro_video":
                    dto.setVideoLink(contentLink);
                    break;
            }
        }

        List<TutorSearchResponseDto> dtos = new ArrayList<>();
        for (TutorSearchResponseDto dto : tutorMap.values()) {
            if (dto.getProfileImgLink() != null && dto.getCvLink() != null && dto.getVideoLink() != null) {
                dtos.add(dto);
            }
        }

        return dtos;
    }
}
