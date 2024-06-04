package com.gdsd.TutorService.repository;

import com.gdsd.TutorService.model.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Integer>, TutorSearchRepository {
}
