package com.seniorconnect.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String college;
    private String branch;
    private Integer graduationYear;
    private String company;
    private String jobRole;
    private String skills;
    private Boolean verified;
    private String bio;
}
