package com.seniorconnect.user.controller;

import com.seniorconnect.user.entity.Company;
import com.seniorconnect.user.entity.StudentProfile;
import com.seniorconnect.user.repository.CompanyRepository;
import com.seniorconnect.user.repository.StudentProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final StudentProfileRepository studentProfileRepository;
    private final CompanyRepository companyRepository;

    @GetMapping("/students/{userId}")
    public ResponseEntity<?> getStudentProfile(@PathVariable Long userId) {
        StudentProfile profile = studentProfileRepository.findByUserId(userId).orElse(null);
        if (profile == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/students/profile")
    public ResponseEntity<?> saveOrUpdateStudentProfile(@RequestBody StudentProfile profile) {
        StudentProfile existing = studentProfileRepository.findByUserId(profile.getUserId()).orElse(null);
        if (existing != null) {
            if (profile.getCollege() != null) existing.setCollege(profile.getCollege());
            if (profile.getBranch() != null) existing.setBranch(profile.getBranch());
            if (profile.getGraduationYear() != null) existing.setGraduationYear(profile.getGraduationYear());
            if (profile.getTargetRole() != null) existing.setTargetRole(profile.getTargetRole());
            if (profile.getBio() != null) existing.setBio(profile.getBio());
            if (profile.getDsaProgressPercentage() != null) existing.setDsaProgressPercentage(profile.getDsaProgressPercentage());
            if (profile.getAptitudeProgressPercentage() != null) existing.setAptitudeProgressPercentage(profile.getAptitudeProgressPercentage());
            if (profile.getCsProgressPercentage() != null) existing.setCsProgressPercentage(profile.getCsProgressPercentage());
            if (profile.getResumeProgressPercentage() != null) existing.setResumeProgressPercentage(profile.getResumeProgressPercentage());
            return ResponseEntity.ok(studentProfileRepository.save(existing));
        }
        return ResponseEntity.ok(studentProfileRepository.save(profile));
    }

    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getCompanies() {
        return ResponseEntity.ok(companyRepository.findAll());
    }

    @PostMapping("/companies")
    public ResponseEntity<Company> addCompany(@RequestBody Company company) {
        return ResponseEntity.ok(companyRepository.save(company));
    }
}
