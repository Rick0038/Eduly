package com.gdsd.TutorService.controller.Auth;

import com.gdsd.TutorService.config.GeneralSecurityConfig.JwtTokenProvider;
import com.gdsd.TutorService.config.UserDetailsServices.CustomAdminDetailsService;
import com.gdsd.TutorService.config.UserDetailsServices.CustomStudentDetailsService;
import com.gdsd.TutorService.config.UserDetailsServices.CustomTutorDetailsService;
import com.gdsd.TutorService.dto.Auth.LoginRequestDto;
import com.gdsd.TutorService.dto.Auth.LoginResponseDto;
import com.gdsd.TutorService.dto.Auth.RegisterRequestDto;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.repository.AdminRepository;
import com.gdsd.TutorService.repository.StudentRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.AdminService;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;

@RestController
@RequestMapping("/auth/v1")
public class AuthController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private CustomTutorDetailsService customTutorDetailsService;

    @Autowired
    private CustomStudentDetailsService customStudentDetailsService;

    @Autowired
    private TutorRepository tutorRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TutorService tutorService;

    @Autowired
    private StudentService studentService;
    @Autowired
    private CustomAdminDetailsService customAdminDetailsService;
    @Autowired
    private AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequestDto registerRequestDto) {

        String email = registerRequestDto.getEmail();
        String password = registerRequestDto.getPassword();
        String firstName = registerRequestDto.getFirstName();
        String lastName = registerRequestDto.getLastName();

        //check if the email is already registered
        if (accountAlreadyExists(email)) {
            throw new GenericException("User with Email-Id: " + email
                    + " is already registered to Eduly. Pleas log-in instead."
                    , HttpStatus.BAD_REQUEST);
        }

        // By default langauge will be set to English. Tutor can update this in his profile.
        if(registerRequestDto.getRole().equals("TUTOR")) {
            Tutor tutor = new Tutor();
            tutor.setTutorId(null);
            tutor.setRating(0.0);
            tutor.setNumLessonsTaught(0);
            tutor.setPrice(0.0);
            tutor.setNumberOfRatings(0);
            tutor.setStatus("PENDING_APPROVAL");
            tutor.setEmail(email);
            tutor.setPassword(passwordEncoder.encode(password));
            tutor.setFirstName(firstName);
            tutor.setLastName(lastName);
            tutor.setLanguage("English");

            tutorRepository.save(tutor);
        } else if (registerRequestDto.getRole().equals("STUDENT")) {
            Student student = new Student();
            student.setStudentId(null);
            student.setBanned(false);
            student.setLocked(false);
            student.setEmail(email);
            student.setPassword(passwordEncoder.encode(password));
            student.setFirstName(firstName);
            student.setLastName(lastName);

            studentRepository.save(student);
        } else {
            throw new GenericException("Incorrect Role provided", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto) {
        String email = loginRequestDto.getEmail();
        String password = loginRequestDto.getPassword();
        String role = loginRequestDto.getRole();

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        UserDetails userDetails = null;

        if(role.equals("TUTOR")) {
            userDetails = customTutorDetailsService.loadUserByUsername(email);

            if (userDetails == null) {
                throw new GenericException("Invalid Email", HttpStatus.UNAUTHORIZED);
            }

            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new GenericException("Invalid Email or Password", HttpStatus.UNAUTHORIZED);
            }

            Integer tutorId = tutorService.getTutorIdFromEmail(email);
            loginResponseDto.setId(tutorId);
            loginResponseDto.setName(tutorService.getTutorNameFromId(tutorId));
            loginResponseDto.setProfileImgLink(tutorService.getTutorProfileImageFromId(tutorId));
            loginResponseDto.setRole("TUTOR");
        } else if (role.equals("STUDENT")) {
            userDetails = customStudentDetailsService.loadUserByUsername(email);

            if (userDetails == null) {
                throw new GenericException("Invalid Email", HttpStatus.UNAUTHORIZED);
            }

            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new GenericException("Invalid Email or Password", HttpStatus.UNAUTHORIZED);
            }

            Integer studentId = studentService.getStudentIdFromEmail(email);
            loginResponseDto.setId(studentId);
            loginResponseDto.setName(studentService.getStudentNameFromId(studentId));
            loginResponseDto.setProfileImgLink(studentService.getStudentProfileImageFromId(studentId));
            loginResponseDto.setRole("STUDENT");
        }else if(role.equals("ADMIN")){
            userDetails = customAdminDetailsService.loadUserByUsername(email);

            if (userDetails == null) {
                throw new GenericException("Invalid Email", HttpStatus.UNAUTHORIZED);
            }

            if (!password.equals(userDetails.getPassword())) {
                throw new GenericException("Invalid Email or Password", HttpStatus.UNAUTHORIZED);
            }

            Integer adminId = adminService.getAdminIdFromEmail(email);
            loginResponseDto.setId(adminId);
            loginResponseDto.setName(adminService.getAdminNameFromId(adminId));
            loginResponseDto.setRole("ADMIN");

        } else {
            throw new GenericException("Incorrect Role provided", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication, loginRequestDto.getRole());
        loginResponseDto.setToken(token);

        return new ResponseEntity<>(loginResponseDto, HttpStatus.OK);
    }

    public Boolean accountAlreadyExists(String email) {
        if(tutorRepository.existsByEmail(email) || studentRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }
}
