package com.seniorconnect.user.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "company_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String companyName;
    private String role;
    private LocalDate applicationDate;
    private LocalDate deadline;
    private String status; // WISHLIST, APPLIED, OA, SHORTLISTED, TECHNICAL_INTERVIEW, HR_INTERVIEW, OFFER, REJECTED, WITHDRAWN
    private String jobUrl;
    @Column(length = 1000)
    private String notes;
}
