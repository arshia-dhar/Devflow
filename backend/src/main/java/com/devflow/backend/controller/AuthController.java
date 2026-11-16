
package com.devflow.backend.controller;

import com.devflow.backend.dto.LoginRequest;
import com.devflow.backend.dto.RegisterRequest;
import com.devflow.backend.entity.User;
import com.devflow.backend.security.JwtService;
import com.devflow.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(request.password());

        userService.register(user);

        return Map.of("message", "User registered successfully");
    }

    @PostMapping("/login")
    public Map<String, String> login(
            @Valid @RequestBody LoginRequest request) {

        User user = userService.login(
            request.email(),
            request.password()
        );

        String token = jwtService.generateToken(user.getEmail());

        return Map.of(
            "message", "Login successful",
            "token", token
        );
    }
}
