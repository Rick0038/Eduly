package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer>, TutorSearchRepository {
    Optional<Tutor> findByEmail(String email);
    Boolean existsByEmail(String email);
    @Query("SELECT DISTINCT t.language FROM Tutor t")
    List<String> findDistinctLanguages();

    List<Tutor> findByIsBannedTrue();
    @Transactional
    @Modifying
    @Query("UPDATE Tutor t SET t.isBanned = :isBanned WHERE t.tutorId = :tutorId")
    void updateIsBannedByTutorId(@Param("tutorId") Integer tutorId, @Param("isBanned") Boolean isBanned);
    @Query("SELECT t.bbbLink FROM Tutor t WHERE t.tutorId = :tutorId")
    String findBbbLinkByTutorId(@Param("tutorId") Integer tutorId);
}
