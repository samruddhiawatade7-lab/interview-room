package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "aptitude_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AptitudeProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String category; // Percentages, Profit & Loss, Time & Work, Logical Reasoning, Verbal, etc.
    private Integer totalAttempted;
    private Integer correctCount;
    private Double accuracyPercentage;
}
