package com.baseball;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication tells Spring Boot this is the starting point of the app.
// It automatically sets up everything Spring needs to run.
@SpringBootApplication
public class BaseballApplication {

    // This is the entry point — when you run "mvn spring-boot:run", Java starts here.
    // SpringApplication.run() boots up the web server and gets everything ready.
    public static void main(String[] args) {
        SpringApplication.run(BaseballApplication.class, args);
    }
}
