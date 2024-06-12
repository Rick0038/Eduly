package com.gdsd.TutorService.repository.impl;

import com.gdsd.TutorService.dto.Tutor.TutorSearchResponseDto;
import com.gdsd.TutorService.repository.TutorSearchRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.ArrayList;
import java.util.List;

public class TutorSearchRepositoryImpl implements TutorSearchRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<TutorSearchResponseDto> searchTutors(Double pricingMin,
                                                     Double pricingMax, Double ratingsMin,
                                                     String topic, String language,
                                                     Integer experienceMin) {

        StringBuilder queryBuilder = new StringBuilder(
                "SELECT tut.tutorId AS tutorId, " +
                        "tut.firstName AS firstName, " +
                        "tut.lastName AS lastName, " +
                        "tut.price AS pricing, " +
                        "tut.rating AS rating, " +
                        "top.topicName AS topic, " +
                        "tut.language AS language, " +
                        "tut.experience AS experience, " +
                        "tut.intro AS intro, " +
                        "tut.profilePicture AS profileImgLink " +
                        "FROM tutor_user_det tut " +
                        "JOIN tutor_topic_det top ON tut.tutorId = top.tutorId WHERE 1=1");


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
            queryBuilder.append(" AND top.topicName = :topic");
        }
        if (language != null) {
            queryBuilder.append(" AND tut.language = :language");
        }
        if (experienceMin != null) {
            queryBuilder.append(" AND tut.experience >= :experienceMin");
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
        if (experienceMin != null) {
            query.setParameter("experienceMin", experienceMin);
        }

        List<Object[]> results = query.getResultList();
        List<TutorSearchResponseDto> dtos = new ArrayList<>();

        for (Object[] result : results) {
            TutorSearchResponseDto dto = new TutorSearchResponseDto();

            dto.setId(((Number) result[0]).intValue());
            dto.setFirstName((String) result[1]);
            dto.setLastName((String) result[2]);
            dto.setPricing(((Number) result[3]).doubleValue());
            dto.setRating(((Number) result[4]).doubleValue());
            dto.setTopic((String) result[5]);
            dto.setLanguage((String) result[6]);
            dto.setExperience(((Number) result[7]).doubleValue());
            dto.setIntro((String) result[8]);
            dto.setProfileImgLink((String) result[9]);

            dtos.add(dto);
        }

        return dtos;
    }
}
