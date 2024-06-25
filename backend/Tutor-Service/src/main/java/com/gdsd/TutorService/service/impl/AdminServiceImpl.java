package com.gdsd.TutorService.service.impl;


import com.gdsd.TutorService.dto.Admin.BannedUserDTO;
import com.gdsd.TutorService.dto.Admin.StudentContentDTO;
import com.gdsd.TutorService.dto.Admin.TutorAdminContentDTO;
import com.gdsd.TutorService.model.*;
import com.gdsd.TutorService.repository.*;
import com.gdsd.TutorService.service.interf.AdminService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;



import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
private StudentRepository studentRepository;
    @Autowired
    private TutorContentRepository tutorContentRepository;

    @Autowired
    private StudentContentRepository studentContentRepository;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public List<TutorAdminContentDTO> getPendingApprovalTutorContents() {
        List<TutorContent> pendingContents = tutorContentRepository.findByStatus("PENDING_APPROVAL");

        return pendingContents.stream()
                .map(content -> {
                    Integer contentId = content.getContentId();
                    Integer tutorId = content.getTutorId();
                    String contentLink = content.getContentLink();
                    String status = content.getStatus();
                    String contentType = content.getContentType();
                    String tutorName = tutorService.getTutorNameFromId(content.getTutorId());
                    return new TutorAdminContentDTO(contentId, tutorId, contentLink, status, tutorName, contentType);
                })
                .toList();
    }

    @Override
    public List<StudentContentDTO> getPendingApprovalStudentContents() {
        List<StudentContent> pendingContents = studentContentRepository.findByStatus("PENDING_APPROVAL");

        return pendingContents.stream()
                .map(content -> new StudentContentDTO(
                        content.getContentId(),
                        content.getStudentId(),
                        content.getContentType(),
                        content.getContentLink(),
                        studentService.getStudentNameFromId(content.getStudentId()),
                        content.getStatus()

//                        content.getUploadTimestamp()
                ))
                .collect(Collectors.toList());

    }

    @Override
    public boolean approvContentById(Integer contentId, String role) {

        if ("TUTOR".equalsIgnoreCase(role)) {

            Optional<TutorContent> optionalContent = tutorContentRepository.findByContentId(contentId);
            if (optionalContent.isPresent()) {

                TutorContent content = optionalContent.get();
                content.setStatus("APPROVED");
                tutorContentRepository.save(content);
                return true;

            }

        } else if ("STUDENT".equalsIgnoreCase(role)) {

            Optional<StudentContent> optionalContent = studentContentRepository.findByContentId(contentId);
            if (optionalContent.isPresent()) {

                StudentContent content = optionalContent.get();
                content.setStatus("APPROVED");
                studentContentRepository.save(content);
                return true;

            }
        }
        return false;
    }

    @Override
    public boolean deleteContentById(Integer contentId, String role) {

        if ("TUTOR".equalsIgnoreCase(role)) {
            if (tutorContentRepository.existsById(contentId)) {
                tutorContentRepository.deleteById(contentId);
                return true;
            }
        } else if ("STUDENT".equalsIgnoreCase(role)) {
            if (studentContentRepository.existsById(contentId)) {
                studentContentRepository.deleteById(contentId);
                return true;
            }
        }
        return false;
    }


    @Override
    public List<BannedUserDTO> getBannedUsers() {
        List<Student> bannedStudents = studentRepository.findByIsBannedTrue();
        List<Tutor> bannedTutors = tutorRepository.findByIsBannedTrue();

        List<BannedUserDTO> bannedStudentDTOs = bannedStudents.stream()
                .map(student -> new BannedUserDTO(
                        student.getStudentId(),
                        studentService.getStudentNameFromId(student.getStudentId()),
                        "BANNED",
                        "STUDENT"
                ))
                .toList();

        List<BannedUserDTO> bannedTutorDTOs = bannedTutors.stream()
                .map(tutor -> new BannedUserDTO(
                        tutor.getTutorId(),
                        tutorService.getTutorNameFromId(tutor.getTutorId()),
                        "BANNED",
                        "TUTOR"
                ))
                .toList();

        return Stream.concat(bannedStudentDTOs.stream(), bannedTutorDTOs.stream())
                .collect(Collectors.toList());
    }

    @Override
    public boolean banTutororStudent(Integer id, String role) {

        if ("TUTOR".equalsIgnoreCase(role)) {
            tutorRepository.updateIsBannedByTutorId(id,true);
            tutorContentRepository.deleteByTutorId(id);


        } else if ("STUDENT".equalsIgnoreCase(role)) {
           studentRepository.updateIsBannedByStudentId(id,true);
           studentContentRepository.deleteByStudentId(id);
        }
        return false;

    }
    public Integer getAdminIdFromEmail(String email) {
        Admin admin = adminRepository.findByEmailId(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + email));
        return admin.getUid();
    }

    public String getAdminNameFromId(Integer id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with id: " + id));
        return admin.getName();
    }

 }
