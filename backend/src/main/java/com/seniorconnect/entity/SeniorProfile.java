package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "senior_profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeniorProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String company;
    private String role;
    private String college;
    private Integer graduationYear;
    private Double rating;
    private Integer studentsHelped;
    private String skills;
    private String bio;
    private String availability;
    private Boolean isVerified;
}
