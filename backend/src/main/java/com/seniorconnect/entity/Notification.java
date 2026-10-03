package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "notifications")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientId;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    private String type; // MENTORSHIP_ACCEPTED, SESSION_BOOKED, REVIEW_COMPLETED, SYSTEM
    private String linkUrl;
    private Boolean isRead;
}
