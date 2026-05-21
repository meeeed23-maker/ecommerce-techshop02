package com.ecommerce.controller;

import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        if (userRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Ce nom d'utilisateur est déjà pris"));
        }

        User user = new User(username, passwordEncoder.encode(password), User.Role.ROLE_USER);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Compte créé", "username", username, "role", "ROLE_USER"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(java.security.Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Non authentifié"));
        }
        return userRepository.findByUsername(principal.getName())
            .map(user -> ResponseEntity.ok(Map.of("username", user.getUsername(), "role", user.getRole().name(), "id", user.getId())))
            .orElse(ResponseEntity.notFound().build());
    }
}
