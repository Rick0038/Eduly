package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    Optional<List<Session>> findByTutorIdAndStatusOrderByDateAscStartTimeAsc(Integer tutorId, String status);
    Optional<List<Session>> findByTutorId(Integer tutorId);
    Optional<List<Session>> findByTutorIdOrderByDateAscStartTimeAsc(Integer tutorId);
    Boolean existsByTutorIdAndStatusAndDay(Integer tutorId, String status, String day);
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Session s " +
            "WHERE s.tutorId = :tutorId AND s.status = 'FREE' AND s.startTime >= :startTime")
    Boolean existsByTutorIdAndStatusAndStartTimeGreaterThanEqual(
            @Param("tutorId") Integer tutorId,
            @Param("startTime") LocalTime startTime);
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END FROM Session s " +
            "WHERE s.tutorId = :tutorId AND s.status = 'FREE' AND s.endTime <= :endTime")
    Boolean existsByTutorIdAndStatusAndEndTimeLessThanEqual(
            @Param("tutorId") Integer tutorId,
            @Param("endTime") LocalTime endTime);
}
