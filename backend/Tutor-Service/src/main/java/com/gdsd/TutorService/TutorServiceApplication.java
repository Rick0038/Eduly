package com.gdsd.TutorService;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TutorServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(TutorServiceApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper() { return new ModelMapper(); }
}
