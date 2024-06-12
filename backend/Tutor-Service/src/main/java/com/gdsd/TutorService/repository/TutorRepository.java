package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer>, TutorSearchRepository {
    Optional<Tutor> findByEmail(String email);
}
