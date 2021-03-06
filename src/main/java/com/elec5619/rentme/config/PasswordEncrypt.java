package com.elec5619.rentme.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Random;

@Component
public class PasswordEncrypt {

    @Value("${bcrypt.salt}")
    private String salt;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12, new SecureRandom(this.salt.getBytes()));
    }

    @Bean
    public static String randomPassword() {
        String saltChars = "ABCDEFGHIJKLMNOPQRSTUVWSYZ1234567890";
        StringBuilder salt = new StringBuilder();

        Random random = new Random();
        while(salt.length() < 18) {
            int index = random.nextInt() * saltChars.length();
            salt.append(index);
        }

        return salt.toString();
    }
}
