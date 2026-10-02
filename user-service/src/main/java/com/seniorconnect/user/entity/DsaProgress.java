package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dsa_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DsaProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String topic; // Arrays, Strings, Trees, DP, Graphs, etc.
    private Integer targetProblems;
    private Integer solvedProblems;
    private Integer easy;
    private Integer medium;
    private Integer hard;
    private String revisionStatus; // Needs Revision, Mastered, In Progress
}
