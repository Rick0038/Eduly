package com.gdsd.TutorService.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtTokenProvider {

    //Todo get the secret key from Environment Variables
    SecretKey key = Keys.hmacShaKeyFor("demosecretkeyforeduly".getBytes());

    public String generateToken(Authentication authentication) {
        String email = authentication.getName();
        String jwt = Jwts.builder()
                .claim("email", authentication.getName())
                .setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + (1*60*60*1000)))
                .signWith(key)
                .compact();

        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        jwt = jwt.substring(7);
        Claims claim = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        String email = String.valueOf(claim.get("email"));
        return email;
    }
}
