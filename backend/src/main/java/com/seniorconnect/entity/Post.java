package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String channel;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Long authorId;
    private String authorName;
    private String authorRole;
    private String authorCompany;
    private String flair;
    private Integer upvotes;
    private Integer downvotes;
    private Integer commentsCount;

    @Column(columnDefinition = "TEXT")
    private String oaTopics;

    @Column(columnDefinition = "TEXT")
    private String technicalQuestions;

    @Column(columnDefinition = "TEXT")
    private String prepTips;

    private String createdAt;
}
