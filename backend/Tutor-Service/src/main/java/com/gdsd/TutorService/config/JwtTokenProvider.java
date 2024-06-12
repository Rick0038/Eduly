package com.gdsd.TutorService.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
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

    public String generateToken(Authentication authentication) {
        String email = authentication.getName();
        String jwt = Jwts.builder()
                .claim("email", authentication.getName())
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + (1*60*60*1000)))
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
}
