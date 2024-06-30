package com.gdsd.TutorService.config.GeneralSecurityConfig;

import com.gdsd.TutorService.exception.GenericException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;

@Service
public class JwtTokenProvider {

    //Todo get the secret key from Environment Variables
    @Value("${app.jwt.secret}")
    private String jwtSecret;

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String generateToken(Authentication authentication, String role) {
        String email = authentication.getName();
        String jwt = Jwts.builder()
                .claim("role", role)
                .setSubject(email)
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + (4*60*60*1000)))
                .signWith(key())
                .compact();

        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        String email = claims.getSubject();

        return email;
    }

    public String getRoleFromToken(String jwt) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(jwt)
                .getBody();

        String role = claims.get("role", String.class);

        return role;
    }

    public String getTokenFromAuthorizationHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        throw new GenericException("Authorization Header is not valid", HttpStatus.BAD_REQUEST);
    }
}
