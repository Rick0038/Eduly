package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<Session, Integer> {
    Optional<List<Session>> findByTutorIdAndStatusOrderByDateAscStartTimeAsc(Integer tutorId, String status);

    Optional<List<Session>> findByTutorId(Integer tutorId);

    @Query("SELECT s FROM Session s WHERE s.tutorId = :tutorId AND s.status = :status AND (s.date > :currentDate OR (s.date = :currentDate AND s.startTime >= :currentTime)) ORDER BY s.date ASC, s.startTime ASC")
    Optional<List<Session>> findByTutorIdAndStatusAfterCurrentTime(
            @Param("tutorId") Integer tutorId,
            @Param("status") String status,
            @Param("currentDate") LocalDate currentDate,
            @Param("currentTime") LocalTime currentTime);

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

    @Transactional
    @Modifying
    @Query("UPDATE Session s SET s.status = 'COMPLETED' WHERE s.date < :currentDate")
    void updateSessionsToCompleted(LocalDate currentDate);

    @Query("SELECT s FROM Session s WHERE s.studentId = :studentId AND s.status = :status AND s.date >= :today ORDER BY s.date ASC, s.startTime ASC")
    List<Session> findByStudentIdAndDateAfterOrDateEqualsAndStatus(
            @Param("studentId") Integer studentId,
            @Param("today") LocalDate today,
            @Param("status") String status
    );
}
