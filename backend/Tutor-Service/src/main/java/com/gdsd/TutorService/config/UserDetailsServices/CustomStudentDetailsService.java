package com.gdsd.TutorService.config.UserDetailsServices;

import com.gdsd.TutorService.exception.GenericTutorException;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomStudentDetailsService implements UserDetailsService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Student student = studentRepository.findByEmail(email)
                .orElseThrow(() ->
                        new GenericTutorException("Student with email" + email + " not found.",
                                HttpStatus.NOT_FOUND));

        List<GrantedAuthority> authorities = new ArrayList<>();

        return new User(student.getEmail(), student.getPassword(), authorities);
    }
}
