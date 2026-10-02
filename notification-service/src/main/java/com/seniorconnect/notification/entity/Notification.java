package com.seniorconnect.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long recipientId;
    private String title;
    @Column(length = 1000)
    private String message;
    private String type; // MENTORSHIP_ACCEPTED, SESSION_BOOKED, RESUME_COMPLETED, MOCK_COMPLETED, SENIOR_VERIFIED
    private String linkUrl;
    private Boolean isRead = false;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (isRead == null) isRead = false;
    }
}
