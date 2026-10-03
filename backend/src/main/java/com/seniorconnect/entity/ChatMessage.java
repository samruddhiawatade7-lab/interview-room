package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chat_messages")
@Data
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
    private String senderRole;
    private Long recipientId;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String timestamp;
}
