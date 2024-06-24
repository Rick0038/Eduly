package com.gdsd.TutorService.config.GeneralSecurityConfig;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.gdsd.TutorService.exception.GenericException;
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

@Service
public class JwtTokenValidator extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader("Authorization");

        if(jwt != null) {

            jwt = jwt.substring(7);

            try {
                String email = tokenProvider.getEmailFromToken(jwt);
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (ExpiredJwtException ex) {
                // Check if the request path is for an unauthenticated endpoint
                String requestPath = request.getRequestURI();
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search")) {
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
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search")) {
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
                if (requestPath.equals("/topics") || requestPath.equals("/languages") || requestPath.equals("/tutor/search")) {
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
