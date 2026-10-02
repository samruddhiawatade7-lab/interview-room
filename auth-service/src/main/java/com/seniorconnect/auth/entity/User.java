package com.seniorconnect.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // STUDENT, SENIOR, ADMIN

    private String college;
    private String branch;
    private Integer graduationYear;
    
    // Senior specific fields
    private String company;
    private String jobRole;
    private String skills;
    private Boolean verified = false;

    private String profileImage;
    @Column(length = 1000)
    private String bio;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (verified == null) {
            verified = "SENIOR".equalsIgnoreCase(role) ? false : true;
        }
    }
}
