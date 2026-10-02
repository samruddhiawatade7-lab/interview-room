package com.seniorconnect.mentorship.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "session_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long requestId;
    private Long studentId;
    private String studentName;
    private Long seniorId;
    private String seniorName;

    private String topic;
    private String date;
    private String timeSlot;
    private String meetingUrl;
    private String status; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    @Column(length = 1000)
    private String notes;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "CONFIRMED";
        if (meetingUrl == null) meetingUrl = "https://meet.google.com/senior-connect-session";
    }
}
