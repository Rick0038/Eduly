package com.gdsd.TutorService.config.GeneralSecurityConfig;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdsd.TutorService.exception.GenericException;
import com.gdsd.TutorService.model.Student;
import com.gdsd.TutorService.model.Tutor;
import com.gdsd.TutorService.repository.StudentRepository;
import com.gdsd.TutorService.repository.TutorRepository;
import com.gdsd.TutorService.service.interf.StudentService;
import com.gdsd.TutorService.service.interf.TutorService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtTokenValidator extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private StudentService studentService;
    @Autowired
    private StudentRepository studentRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader("Authorization");

        if(jwt != null) {

            jwt = jwt.substring(7);

            try {
                String email = tokenProvider.getEmailFromToken(jwt);
                String role = tokenProvider.getRoleFromToken(jwt);

                if(role.equals("TUTOR")) {
                    Integer tutorId = tutorService.getTutorIdFromEmail(email);
                    Optional<Tutor> tutor = tutorRepository.findById(tutorId);
                    if(tutor.get().getBanned()) {
                        handleException(response, "User with email: " + email + " is currently banned. Please contact the administrator for further help.", HttpStatus.UNAUTHORIZED);
                    }
                }

                if(role.equals("STUDENT")) {
                    Integer studentId = studentService.getStudentIdFromEmail(email);
                    Optional<Student> student = studentRepository.findById(studentId);
                    if(student.get().getBanned()) {
                        handleException(response, "User with email: " + email + " is currently banned. Please contact the administrator for further help.", HttpStatus.UNAUTHORIZED);
                    }
                }

                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (ExpiredJwtException ex) {
                // Check if the request path is for an unauthenticated endpoint
                String requestPath = request.getRequestURI();
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search") || requestPath.startsWith("/forums")) {
                    // Log the expired token and proceed with the filter chain
                    logger.info("Expired JWT token for unauthenticated endpoint, proceeding without authentication");
                    filterChain.doFilter(request, response);
                    return;
                }
                handleException(response, "JWT Token has expired", HttpStatus.UNAUTHORIZED);
                return;
            } catch (SignatureException ex) {
                // Check if the request path is for an unauthenticated endpoint
                String requestPath = request.getRequestURI();
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search")|| requestPath.startsWith("/forums")) {
                    // Log the expired token and proceed with the filter chain
                    logger.info("Invalid JWT token for unauthenticated endpoint, proceeding without authentication");
                    filterChain.doFilter(request, response);
                    return;
                }
                handleException(response, "Invalid JWT signature", HttpStatus.UNAUTHORIZED);
                return;
            } catch (RuntimeException ex) {
                // Check if the request path is for an unauthenticated endpoint
                String requestPath = request.getRequestURI();
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search")|| requestPath.startsWith("/forums")) {
                    // Log the expired token and proceed with the filter chain
                    logger.info("Invalid JWT token for unauthenticated endpoint, proceeding without authentication");
                    filterChain.doFilter(request, response);
                    return;
                }
                handleException(response, ex.getMessage(), HttpStatus.UNAUTHORIZED);
                return;
            }

        }

        filterChain.doFilter(request, response);
    }

    private void handleException(HttpServletResponse response, String message, HttpStatus status) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");

        Map<String, String> apiResponse = new HashMap<>();
        apiResponse.put("message", message);

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), apiResponse);
    }
}
