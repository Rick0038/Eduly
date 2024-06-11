package com.gdsd.TutorService.controller;

import com.gdsd.TutorService.config.CustomTutorDetailsService;
import com.gdsd.TutorService.config.JwtTokenProvider;
import com.gdsd.TutorService.dto.TutorLoginRequestDto;
import com.gdsd.TutorService.dto.TutorLoginResponseDto;
import com.gdsd.TutorService.exception.GenericTutorException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/auth")
public class TutorAuthController {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomTutorDetailsService customTutorDetailsService;

    @PostMapping("/login")
    public ResponseEntity<TutorLoginResponseDto> loginHandler(@RequestBody TutorLoginRequestDto request) {
        String email = request.getEmail();
        String password = request.getPassword();

        UserDetails userDetails = customTutorDetailsService.loadUserByUsername(email);

        if(userDetails == null) {
            throw new GenericTutorException("Invalid Username", HttpStatus.BAD_REQUEST);
        }

        if(!password.equals(userDetails.getPassword())) {
            throw new GenericTutorException("Invalid Username or Password", HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, new ArrayList<>());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);

        TutorLoginResponseDto response = new TutorLoginResponseDto();
        response.setJwt(jwt);
        response.setAuthorized(true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
