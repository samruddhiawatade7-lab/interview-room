package com.seniorconnect.resource.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(length = 1500)
    private String description;

    private String category; // DSA, Aptitude, DBMS, OS, CN, OOP, Java, SQL, React, Spring Boot, System Design, Resume
    private String difficulty; // Beginner, Intermediate, Advanced
    private String tags; // e.g., "Dynamic Programming, Trees, LeetCode"
    private String url;

    private Long uploaderId;
    private String uploaderName;
    private String uploaderRole; // SENIOR, ADMIN

    private String status; // APPROVED, PENDING, REJECTED
    private Integer bookmarksCount = 0;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "APPROVED";
        if (bookmarksCount == null) bookmarksCount = 0;
    }
}
