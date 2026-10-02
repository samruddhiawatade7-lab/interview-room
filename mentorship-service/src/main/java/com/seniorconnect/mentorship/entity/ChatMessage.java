package com.seniorconnect.mentorship.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long mentorshipRequestId;
    private Long senderId;
    private String senderName;
    private String senderRole; // STUDENT, SENIOR
    private Long recipientId;
    @Column(length = 2000)
    private String content;

    private Boolean isRead = false;
    private LocalDateTime timestamp;

    @PrePersist
    public void prePersist() {
        if (timestamp == null) timestamp = LocalDateTime.now();
        if (isRead == null) isRead = false;
    }
}
