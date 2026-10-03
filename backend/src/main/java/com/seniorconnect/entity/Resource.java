package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;
    private String difficulty;
    private String tags;
    private String url;
    private Long uploaderId;
    private String uploaderName;
    private String uploaderRole;
    private Integer bookmarksCount;
}
