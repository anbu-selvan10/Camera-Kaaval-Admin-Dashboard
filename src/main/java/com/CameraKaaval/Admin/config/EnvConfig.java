package com.CameraKaaval.Admin.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;
import jakarta.annotation.PostConstruct;

@Configuration
public class EnvConfig {

    @PostConstruct
    public void loadEnvVariables() {
        Dotenv dotenv = Dotenv.load();

        // Set system property for MongoDB URI
        System.setProperty("MONGO_URI", dotenv.get("MONGO_URI"));
    }
}
