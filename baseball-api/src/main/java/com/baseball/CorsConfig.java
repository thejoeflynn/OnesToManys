package com.baseball;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS (Cross-Origin Resource Sharing) is a browser security feature that blocks
// web pages from making requests to a different server than the one they came from.
// Since our HTML file and our API run separately, we need to tell Spring Boot
// to allow requests coming from the browser. This config opens it up for local development.
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")         // apply to all endpoints
                .allowedOrigins("*")       // allow requests from any origin
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // allow these HTTP methods
    }
}
