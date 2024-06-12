package com.gdsd.StudentService;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StudentServiceApplication {
    public static void main(String[] args) {

        // THIS IS MAIN METHOD IT WILL START THE APP 0
        SpringApplication.run(StudentServiceApplication.class, args);
    }

    @Bean
    public ModelMapper modelMapper() { return new ModelMapper(); }
}
