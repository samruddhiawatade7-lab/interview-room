package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
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

    private String college;
    private String branch;
    private Integer graduationYear;

    @Column(nullable = false)
    private String role; // STUDENT, SENIOR, ADMIN

    private String company;
    private String jobRole;
    private Boolean isVerified;
    private Integer karma;
}
