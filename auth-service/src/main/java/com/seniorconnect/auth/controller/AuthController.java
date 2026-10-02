package com.seniorconnect.auth.controller;

import com.seniorconnect.auth.config.JwtTokenProvider;
import com.seniorconnect.auth.dto.JwtAuthResponse;
import com.seniorconnect.auth.dto.LoginRequest;
import com.seniorconnect.auth.dto.RegisterRequest;
import com.seniorconnect.auth.dto.UserDto;
import com.seniorconnect.auth.entity.User;
import com.seniorconnect.auth.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElse(null);

        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }

        String token = jwtTokenProvider.generateToken(user);
        UserDto userDto = mapToDto(user);

        return ResponseEntity.ok(JwtAuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(userDto)
                .build());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email is already registered"));
        }

        String role = registerRequest.getRole().toUpperCase();
        if (!role.equals("STUDENT") && !role.equals("SENIOR") && !role.equals("ADMIN")) {
            role = "STUDENT";
        }

        User user = User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(role)
                .college(registerRequest.getCollege())
                .branch(registerRequest.getBranch())
                .graduationYear(registerRequest.getGraduationYear())
                .company(registerRequest.getCompany())
                .jobRole(registerRequest.getJobRole())
                .skills(registerRequest.getSkills())
                .bio(registerRequest.getBio())
                .verified("SENIOR".equals(role) ? false : true)
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(JwtAuthResponse.builder()
                .accessToken(token)
                .tokenType("Bearer")
                .user(mapToDto(savedUser))
                .build());
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String bearerToken) {
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Missing or invalid authorization token"));
        }
        String token = bearerToken.substring(7);
        if (!jwtTokenProvider.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid or expired token"));
        }
        String email = jwtTokenProvider.getUsername(token);
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "User not found"));
        }
        return ResponseEntity.ok(mapToDto(user));
    }

    @PostMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String email = jwtTokenProvider.getUsername(token);
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                return ResponseEntity.ok(Map.of("valid", true, "email", email, "role", user.getRole(), "userId", user.getId()));
            }
        }
        return ResponseEntity.ok(Map.of("valid", false));
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .college(user.getCollege())
                .branch(user.getBranch())
                .graduationYear(user.getGraduationYear())
                .company(user.getCompany())
                .jobRole(user.getJobRole())
                .skills(user.getSkills())
                .verified(user.getVerified())
                .bio(user.getBio())
                .build();
    }
}
