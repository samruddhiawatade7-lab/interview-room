package com.seniorconnect.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "session_bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String studentName;
    private Long seniorId;
    private String seniorName;
    private String topic;
    private String date;
    private String timeSlot;
    private String status; // CONFIRMED, COMPLETED, CANCELLED
    private String meetingUrl;
}
