package com.roehr.equipmenttracker.controller;

import com.roehr.equipmenttracker.dto.LoginDto;
import com.roehr.equipmenttracker.dto.AuthTokenDto;
import com.roehr.equipmenttracker.service.UserService;
import com.roehr.equipmenttracker.security.TokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService; // Service to create JWT tokens

   
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginDto loginDto) {
        boolean isAuthenticated = userService.authenticateUser(loginDto.getUsername(), loginDto.getProvidedPin());
        if (isAuthenticated) {
            String token = tokenService.createToken(loginDto.getUsername()); 
            logger.info("User '{}' authenticated successfully.", loginDto.getUsername());
            return ResponseEntity.ok(new AuthTokenDto(token));
        } else {
            logger.warn("Authentication failed for user '{}'.", loginDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        userService.logout(); 
        logger.info("User logged out.");
        return ResponseEntity.ok().build();
    }
}
