package com.example.ecommerce.controller;

import com.example.ecommerce.model.User;
import com.example.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

// UserController.java
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody User user) {
        userRepository.save(user);

        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        response.put("message", "User registered successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());

        Map<String, String> response = new HashMap<>();
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            response.put("status", "success");
            response.put("message", "Login successful");

            // Check if the user is an admin based on email
            if ("admin@example.com".equals(existingUser.getEmail())) {
                response.put("userType", "admin");
            } else {
                response.put("userType", "customer");
            }

            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "Login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }



}
