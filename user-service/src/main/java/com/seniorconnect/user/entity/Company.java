package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
    private String logoUrl;
    private String website;
    @Column(length = 1000)
    private String description;
    private String tier; // Tier 1, Product, MNC, Startup
    private String avgPackage;
}
