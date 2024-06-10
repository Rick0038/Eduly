# Use a base image with Java 17
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

RUN ["ls"]

# Copy the compiled JAR file into the container
COPY target/Tutor-Service-0.0.1-SNAPSHOT.jar /app/tutor-service.jar

# Expose the application's port
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "tutor-service.jar"]
