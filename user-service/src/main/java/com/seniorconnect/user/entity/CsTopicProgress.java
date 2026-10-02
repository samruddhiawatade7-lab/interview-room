package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cs_topic_progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CsTopicProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String subject; // DBMS, Operating Systems, Computer Networks, OOP, SQL
    private String topic;
    private String status; // Not Started, Learning, Completed, Needs Revision
    @Column(length = 1000)
    private String notes;
}
