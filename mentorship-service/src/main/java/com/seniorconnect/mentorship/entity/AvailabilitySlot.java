package com.seniorconnect.mentorship.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "availability_slots")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilitySlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long seniorId;
    private String dayOfWeek; // Monday, Wednesday, etc.
    private String startTime; // 18:00
    private String endTime;   // 19:00
    private Boolean isBooked = false;
}
