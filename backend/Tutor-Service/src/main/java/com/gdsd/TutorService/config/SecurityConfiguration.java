package com.gdsd.TutorService.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfiguration {

    @Autowired
    private JwtTokenValidator tokenValidator;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .sessionManagement(management ->
                        management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(tokenValidator, UsernamePasswordAuthenticationFilter.class)
                .csrf(csrf -> csrf.disable())
                .httpBasic(Customizer.withDefaults())
                // Todo change it to /api to secure requests in the future
                .authorizeHttpRequests(auth -> auth.requestMatchers("/testsec/**")
                        .authenticated()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
