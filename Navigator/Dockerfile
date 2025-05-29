# Use OpenJDK 17 base image
FROM openjdk:17

# Add JAR to container
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

# Command to run the JAR
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the port the app runs on
EXPOSE 8080

